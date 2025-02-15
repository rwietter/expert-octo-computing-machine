import db from "@/db/db";

export async function GET(request: Request): Promise<Response> {
  try {
    const searchParam = new URL(request.url).searchParams.get('search');

    if (!searchParam) {
      return new Response(JSON.stringify({ error: 'Search parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Normalize and clean search terms
    const searchTerms = searchParam
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(term => term.replace(/[^a-z0-9]/g, ''));

    // If no valid search terms, return empty result
    if (searchTerms.length === 0) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const query = `
      WITH RECURSIVE
      matched_articles AS (
        SELECT DISTINCT
          a.id,
          a.title,
          a.doi,
          a.abstract,
          a.publication_date,
          a.page_count,
          a.publication_year,
          CASE 
            WHEN a.title LIKE ? THEN 100
            WHEN a.abstract LIKE ? THEN 50
            WHEN at.name LIKE ? THEN 30
            WHEN ad.address LIKE ? THEN 15
            ELSE 0
          END as relevance_score
        FROM articles a
        LEFT JOIN authors at ON at.article_id = a.id
        LEFT JOIN author_addresses ad ON ad.author_id = at.id
        WHERE 
          a.title LIKE ? OR
          a.abstract LIKE ? OR
          at.name LIKE ? OR
          ad.address LIKE ?
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
          MIN(REPLACE(ad.address, '[', '')) AS author_universities,
          MAX(ma.relevance_score) as relevance
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
      ORDER BY 
          relevance DESC,
          ma.publication_year DESC
      LIMIT 50;
    `;

    console.log('Search terms:', searchTerms); // Debug log

    // Create pattern for each search term
    const pattern = `%${searchTerms.join('%')}%`;

    console.log('pattern:', pattern); // Debug log

    const stmt = db.prepare(query);
    const articles = stmt.all(
      pattern, // title score
      pattern, // abstract score
      pattern, // author score
      pattern, // address score
      pattern, // title search
      pattern, // abstract search
      pattern, // author search
      pattern  // address search
    );

    console.log('Query executed, found results:', articles.length); // Debug log

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Erro ao buscar artigos:', error);
    return new Response(JSON.stringify({
      error: 'Erro ao buscar artigos',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
