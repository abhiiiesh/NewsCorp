import React from "react";
import Header from "@/src/commons/Header";
import PageWrapper from "@/src/commons/PageWrapper";
import GeneratedArticle from "@/src/components/GeneratedArticle";

function ArticlePage() {
  const title = sessionStorage.getItem("title");
  const description = sessionStorage.getItem("description");
  return (
    <PageWrapper>
      <Header text="Article Page" />
      {title && description && (
        <GeneratedArticle title={title} description={description} />
      )}
    </PageWrapper>
  );
}

// export async function getStaticPaths() {
//   const categoryData = await getGameCategories();
//   // Set up static paths
//   const paths = categoryData.map((category) => ({
//     params: { category: category.slug },
//   }));

//   // If the path isn't generated, attempt to do so before showing the user the page
//   // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
//   return { paths, fallback: "blocking" };
// }

// export async function getStaticProps(context: any) {
//   const article = await getGeneratedArticle(context.query.slug);

//   if (!article) {
//     return {
//       props: {
//         error: "No articles were found",
//       },
//     };
//   }
//   return {
//     props: {
//       article,
//     },
//     revalidate: 20,
//   };
// }

export default ArticlePage;
