"use client";

import { useEffect, useState } from "react";
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

interface CategoryResponse {
  category: string;
  articles: number;
}

interface CategoryData {
  name: string;
  articles: number;
  fill: string;
  percent: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CategoryData;
    value: number;
  }>;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCategories();
        // Transform data for radial chart
        const maxArticles = Math.max(...data.map((item: CategoryResponse) => item.articles));
        const sortedData = data
          .sort((a: CategoryResponse, b: CategoryResponse) => b.articles - a.articles)
          .slice(0, 8) // Limit to top 8 for better visualization
          .map((item: CategoryResponse, index: number) => ({
            name: item.category,
            articles: item.articles,
            fill: `hsl(195, ${100 - (index * 8)}%, ${50 + (index * 3)}%)`,
            percent: (item.articles / maxArticles) * 100
          }));
        setCategories(sortedData);
      } catch (err) {
        setError("Falha ao carregar dados de categories. Por favor, tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#121212] p-6 rounded-2xl shadow-2xl w-full mx-auto min-h-[550px] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121212] p-6 rounded-2xl shadow-2xl w-full mx-auto min-h-[550px] flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-[#121212] p-6 rounded-2xl shadow-2xl w-full mx-auto min-h-[550px] flex items-center justify-center">
        <div className="text-white text-lg">Nenhum dado disponível</div>
      </div>
    );
  }

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] shadow-xl">
          <p className="text-white font-medium mb-2">{payload[0].payload.name}</p>
          <p className="text-[#00b4d8]">
            {payload[0].value} {payload[0].value === 1 ? "artigo" : "artigos"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#121212] p-6 mt-4 rounded-2xl shadow-2xl w-full mx-auto">
      <h2 className="text-2xl text-white font-semibold text-center mb-6">
        Número de artigos por categoria
      </h2>
      <ResponsiveContainer width="100%" height={550}>
        <RadialBarChart
          innerRadius="30%"
          outerRadius="90%"
          data={categories}
          startAngle={180}
          endAngle={0}
          cx="50%"
          cy="50%"
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00b4d8" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0077be" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <RadialBar
            dataKey="articles"
            fill="url(#colorGradient)"
            background={{ fill: "#333" }}
            label={{
              position: "insideStart",
              fill: "#fff",
              fontSize: 12
            }}
          />
          <Legend
            iconSize={12}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value) => {
              const item = categories.find(c => c.articles.toString() === value);
              return item ? item.name : value;
            }}
            wrapperStyle={{
              top: "50%",
              right: 0,
              transform: "translate(0, -50%)",
              lineHeight: "24px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "medium"
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Categories;

const fetchCategories = async (): Promise<CategoryResponse[]> => {
  try {
    const res = await fetch("/api/categories");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar categories:", error);
    throw error;
  }
};
