import db from "@/db/db";

export async function GET(request: Request): Promise<Response> {
  try {
    const search = new URL(request.url).searchParams.get('search');
    const query = `
WITH search_terms AS (
  SELECT TRIM(term) AS term
  FROM (
    SELECT value AS term
    FROM json_each('["' || REPLACE(TRIM('${search}'), ' ', '","') || '"]')
  )
)
SELECT
    a.title AS article_title,
    a.doi AS doi,
    a.abstract as abstract,
    a.publication_date as publication_date,
    a.page_count as pages,
    a.publication_year AS publication_year,
    (SELECT GROUP_CONCAT(at.name, '; ')
     FROM (SELECT DISTINCT name FROM authors WHERE article_id = a.id) at) AS author_names,
    (SELECT ad.university
     FROM (SELECT DISTINCT ad.address AS university
           FROM author_addresses ad
           JOIN authors at ON ad.author_id = at.id
           WHERE at.article_id = a.id) ad) AS author_universities
FROM
    articles a
WHERE
    EXISTS (
      SELECT 1
      FROM search_terms st
      WHERE
        a.title LIKE '%' || st.term || '%' OR
        EXISTS (SELECT 1 FROM authors at WHERE at.article_id = a.id AND at.name LIKE '%' || st.term || '%') OR
        EXISTS (SELECT 1 FROM author_addresses ad JOIN authors at ON ad.author_id = at.id WHERE at.article_id = a.id AND ad.address LIKE '%' || st.term || '%')
    )
ORDER BY
    a.publication_year DESC;
    `

    const stmt = db.prepare(query);
    // const articles = stmt.all(`%${search}%`, `%${search}%`, `%${search}%`);
    const articles = stmt.all();

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar artigos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}