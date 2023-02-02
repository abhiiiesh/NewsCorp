import React, { useState } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import GeneratedArticle from "@/src/components/GeneratedArticle";

// import styles from "../src/sections/home/ShowHome.module.scss";
import Article from "@/src/components/Article";
import { ArticleProps } from "@/types/ArticleProps";
import Header from "@/src/commons/Header";

function Tech() {
  const [article, setArticle] = useState<ArticleProps>();
  const [generatedArticle, setGeneratedArticle] = useState<string>();

  const getNews = async () => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    const article = response.data.articles[0];
    setArticle(article);
    generateArticle(article);
  };

  const generateArticle = async (article: ArticleProps) => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write an original article about ${article.title} ${article.description}`,
      temperature: 0.9,
      max_tokens: 800,
    });
    setGeneratedArticle(response.data.choices[0].text);
  };

  return (
    <div>
      <Header text="Tech News" />
      <button onClick={getNews}>Get Headlines</button>
      {article && (
        <Article
          urlToImage={article.urlToImage}
          title={article.title}
          description={article.description}
        />
      )}
      {generatedArticle && (
        <GeneratedArticle generatedArticle={generatedArticle} />
      )}
    </div>
  );
}

export default Tech;
