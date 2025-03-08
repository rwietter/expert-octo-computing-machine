"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// const data = [
//   { publisher: "APPLIED AI", articles: 6 },
//   { publisher: "IEEE Transactions", articles: 4 },
//   { publisher: "Elsevier AI Journal", articles: 3 },
//   { publisher: "Springer ML", articles: 5 },
//   { publisher: "ACM Computing Surveys", articles: 2 },
// ];

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  useEffect(() => {
    fetchPublishers().then((articles) => {
      setPublishers(articles);
    });
  }, []);

  return (
    <div className="bg-[#121212] p-6 rounded-2xl shadow-2xl w-full mx-auto">
      <h2 className="text-2xl text-white font-semibold text-center mb-6">Publicações por Publisher</h2>
      <ResponsiveContainer width="100%" height={550}>
        <BarChart data={publishers} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="publisher"
            stroke="#bbb"
            tick={{ fill: "#ccc" }}
            tickLine={{ stroke: "#444", strokeWidth: 1 }}
            axisLine={{ stroke: "#444", strokeWidth: 1 }}
          />
          <YAxis
            stroke="#bbb"
            tick={{ fill: "#ccc" }}
            tickLine={{ stroke: "#444", strokeWidth: 1 }}
            axisLine={{ stroke: "#444", strokeWidth: 1 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderColor: "#555", color: "#fff" }}
            labelStyle={{ color: "#ddd" }}
          />
          <Legend
            wrapperStyle={{ color: "#fff", padding: "10px", fontSize: "14px" }}
            layout="vertical"
            align="right"
          />
          <Bar dataKey="articles" fill="#00b4d8" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Publishers;

const fetchPublishers = async () => {
  try {
    const res = await fetch(`/api/publishers`);
    if (!res.ok) {
      console.error('Erro ao buscar artigos:', res);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return [];
  }
}