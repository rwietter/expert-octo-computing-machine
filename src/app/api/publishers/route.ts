import db from "@/db/db";

export async function GET(request: Request): Promise<Response> {
  try {
    const query = `
      SELECT publications.name AS publisher, COUNT(articles.id) AS articles
      FROM articles
      JOIN publications ON articles.publication_id = publications.id
      GROUP BY publications.name
      ORDER BY articles DESC
      LIMIT 5;
    `;

    const stmt = db.prepare(query);
    const articles = stmt.all();

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Erro ao fazer query de publishers:', error);
    return new Response(JSON.stringify({
      error: 'Erro ao fazer query de publishers',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
