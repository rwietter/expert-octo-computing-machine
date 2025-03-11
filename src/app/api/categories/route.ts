import db from "@/db/db";

export async function GET(request: Request): Promise<Response> {
  try {
    const query = `
      SELECT
        categories.category as category,
        COUNT(articles.id) as articles
      FROM
        categories
        JOIN articles ON categories.article_id = articles.id
      GROUP BY
        categories.category
      ORDER BY
        articles DESC
      LIMIT
        10;
    `;

    const stmt = db.prepare(query);
    const articles = stmt.all();

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Erro ao fazer query de categories:', error);
    return new Response(JSON.stringify({
      error: 'Erro ao fazer query de categories',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
