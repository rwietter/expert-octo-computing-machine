"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Publisher {
  publisher: string;
  articles: number;
}

const Publishers = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPublishers();
        // Sort publishers by number of articles in descending order
        const sortedData = data.sort((a: Publisher, b: Publisher) => b.articles - a.articles).map((item: Publisher) => {
          return {
            publisher: item.publisher[0] + item.publisher.slice(1).toLowerCase(),
            articles: item.articles
          };
        });
        setPublishers(sortedData);
      } catch (err) {
        setError("Falha ao carregar dados dos publishers. Por favor, tente novamente mais tarde.");
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

  if (publishers.length === 0) {
    return (
      <div className="bg-[#121212] p-6 rounded-2xl shadow-2xl w-full mx-auto min-h-[550px] flex items-center justify-center">
        <div className="text-white text-lg">Nenhum dado disponível</div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          <p className="text-[#00b4d8]">
            {payload[0].value} {payload[0].value === 1 ? 'artigo' : 'artigos'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#121212] p-6 mt-4 rounded-2xl shadow-2xl w-full mx-auto">
      <h2 className="text-2xl text-white font-semibold text-center mb-6">
        Top Publicações por Publisher
      </h2>
      <ResponsiveContainer width="100%" height={650}>
        <BarChart
          data={publishers}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00b4d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#0077be" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#333"
            vertical={false}
          />
          <XAxis
            dataKey="publisher"
            stroke="#bbb"
            tick={{ fill: "#ccc" }}
            tickLine={{ stroke: "#444" }}
            axisLine={{ stroke: "#444" }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis
            stroke="#bbb"
            tick={{ fill: "#ccc" }}
            tickLine={{ stroke: "#444" }}
            axisLine={{ stroke: "#444" }}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Legend
            wrapperStyle={{
              color: "#fff",
              padding: "10px",
              fontSize: "14px",
              fontWeight: "medium"
            }}
            layout="horizontal"
            align="center"
            verticalAlign="top"
          />
          <Bar
            dataKey="articles"
            name="Número de Artigos"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Publishers;

const fetchPublishers = async (): Promise<Publisher[]> => {
  try {
    const res = await fetch('/api/publishers');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar publishers:', error);
    throw error;
  }
};
