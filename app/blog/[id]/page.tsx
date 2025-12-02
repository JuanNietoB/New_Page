"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function BlogPostPage() {
  const params = useParams()
  const { t } = useLanguage()
  const postId = Number(params.id)

  const blogPosts = [
    {
      id: 9,
      title: t.blogPost9Title,
      excerpt: t.blogPost9Excerpt,
      category: t.blogCategory.industryInsightslatamvsusa,
      date: "2025-11-22",
      readTime: "2 min read",
      image: "/usavslatam.jpg",
      content: t.blogPost9Excerpt,
    },
    {
      id: 8,
      title: t.blogPost8Title,
      excerpt: t.blogPost8Excerpt,
      category: t.blogCategory.industryInsightslatam,
      date: "2025-11-06",
      readTime: "3 min read",
      image: "/top_10_latam.jpg",
      content: t.blogPost8Excerpt,
    },
    {
      id: 7,
      title: t.blogPost7Title,
      excerpt: t.blogPost7Excerpt,
      category: t.blogCategory.industryInsightsmex,
      date: "2025-10-24",
      readTime: "2 min read",
      image: "/cne_mexico.jpg",
      content: t.blogPost7Excerpt,
    },
    {
      id: 1,
      title: t.blogPost1Title,
      excerpt: t.blogPost1Excerpt,
      category: t.blogCategory.industryInsights,
      date: "2025-07-27",
      readTime: "2 min read",
      image: "/argentina_grafica.jpg",
      content: t.blogPost1Excerpt,
    },
    {
      id: 2,
      title: t.blogPost2Title,
      excerpt: t.blogPost2Excerpt,
      category: t.blogCategory.marketAnalysis,
      date: "2025-07-15",
      readTime: "2 min read",
      image: "/mapa_colombia.jpg",
      content: t.blogPost2Excerpt,
    },
    {
      id: 3,
      title: t.blogPost3Title,
      excerpt: t.blogPost3Excerpt,
      category: t.blogCategory.technicalGuide,
      date: "2025-06-25",
      readTime: "3 min read",
      image: "/barra_chile.jpg",
      content: t.blogPost3Excerpt,
    },
    {
      id: 4,
      title: t.blogPost4Title,
      excerpt: t.blogPost4Excerpt,
      category: t.blogCategory.policyRegulation,
      date: "2025-06-20",
      readTime: "3 min read",
      image: "/mapa_mex.jpg",
      content: t.blogPost4Excerpt,
    },
    {
      id: 5,
      title: t.blogPost5Title,
      excerpt: t.blogPost5Excerpt,
      category: t.blogCategory.caseStudy,
      date: "2025-05-09",
      readTime: "1 min read",
      image: "/carg_usa.jpg",
      content: t.blogPost5Excerpt,
    },
    {
      id: 6,
      title: t.blogPost6Title,
      excerpt: t.blogPost6Excerpt,
      category: t.blogCategory.economics,
      date: "2025-03-10",
      readTime: "1 min read",
      image: "/Articula_map_Usa.jpg",
      content: t.blogPost6Excerpt,
    },
  ]

  const post = blogPosts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToBlog || "Back to Blog"}
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-8">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-foreground prose-p:text-foreground 
                prose-strong:text-foreground prose-li:text-foreground
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-border prose-td:p-3
                prose-thead:border-b-2 prose-thead:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>

      {/* Related Posts CTA */}
      <section className="py-16 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.exploreMoreArticles || "Explore More Articles"}</h2>
          <Link href="/blog">
            <Button size="lg">{t.viewAllArticles || "View All Articles"}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
