import db from "@/db/db";

export async function GET(request: Request): Promise<Response> {
  try {
    const search = new URL(request.url).searchParams.get('search');
    const query = `
      WITH RECURSIVE
      search_terms AS (
        SELECT TRIM(value) AS term
        FROM json_each('["${search}"]')
      ),
      matched_articles AS (
        SELECT DISTINCT a.id,
              a.title,
              a.doi,
              a.abstract,
              a.publication_date,
              a.page_count,
              a.publication_year
        FROM articles a
        LEFT JOIN authors at ON at.article_id = a.id
        LEFT JOIN author_addresses ad ON ad.author_id = at.id
        CROSS JOIN search_terms st
        WHERE a.title LIKE '%' || st.term || '%'
          OR at.name LIKE '%' || st.term || '%'
          OR ad.address LIKE '%' || st.term || '%'
      )
      SELECT
          ma.title AS article_title,
          ma.doi,
          ma.abstract,
          ma.publication_date,
          ma.page_count as pages,
          ma.publication_year,
          cc.cited_reference_count,
          cc.times_cited,
          cc.total_times_cited,
          cc.usage_count_180,
          cc.usage_count_since_2013,
          GROUP_CONCAT(DISTINCT at.name) AS author_names,
          MIN(REPLACE(ad.address, '[', '')) AS author_universities
      FROM matched_articles ma
      LEFT JOIN authors at ON at.article_id = ma.id
      LEFT JOIN author_addresses ad ON ad.author_id = at.id
      LEFT JOIN citation_counts cc on cc.article_id = ma.id
      GROUP BY
          ma.id,
          ma.title,
          ma.doi,
          ma.abstract,
          ma.publication_date,
          ma.page_count,
          ma.publication_year
      ORDER BY ma.publication_year DESC;
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