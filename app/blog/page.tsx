"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function BlogPage() {
  const { t } = useLanguage()

  const blogPosts = [
    {
      id: 9,
      title: t.blogPost9Title,
      excerpt: t.blogPost9Excerpt,
      category: t.blogCategory.industryInsightslatamvsusa,
      date: "2025-11-22",
      readTime: "2 min read",
      image: "/usavslatam.jpg",
    },
    {
      id: 8,
      title: t.blogPost8Title,
      excerpt: t.blogPost8Excerpt,
      category: t.blogCategory.industryInsightslatam,
      date: "2025-11-6",
      readTime: "3 min read",
      image: "/top_10_latam.jpg",
    },
    {
      id: 7,
      title: t.blogPost7Title,
      excerpt: t.blogPost7Excerpt,
      category: t.blogCategory.industryInsightsmex,
      date: "2025-10-24",
      readTime: "2 min read",
      image: "/cne_mexico.jpg",
    },
    {
      id: 1,
      title: t.blogPost1Title,
      excerpt: t.blogPost1Excerpt,
      category: t.blogCategory.industryInsights,
      date: "2025-07-27",
      readTime: "2 min read",
      image: "/argentina_grafica.jpg",
    },
    {
      id: 2,
      title: t.blogPost2Title,
      excerpt: t.blogPost2Excerpt,
      category: t.blogCategory.marketAnalysis,
      date: "2025-07-15",
      readTime: "2 min read",
      image: "/mapa_colombia.jpg",
    },
    {
      id: 3,
      title: t.blogPost3Title,
      excerpt: t.blogPost3Excerpt,
      category: t.blogCategory.technicalGuide,
      date: "2025-06-25",
      readTime: "3 min read",
      image: "/barra_chile.jpg",
    },
    {
      id: 4,
      title: t.blogPost4Title,
      excerpt: t.blogPost4Excerpt,
      category: t.blogCategory.policyRegulation,
      date: "2025-06-20",
      readTime: "3 min read",
      image: "/mapa_mex.jpg",
    },
    {
      id: 5,
      title: t.blogPost5Title,
      excerpt: t.blogPost5Excerpt,
      category: t.blogCategory.caseStudy,
      date: "2025-05-09",
      readTime: "1 min read",
      image: "/carg_usa.jpg",
    },
    {
      id: 6,
      title: t.blogPost6Title,
      excerpt: t.blogPost6Excerpt,
      category: t.blogCategory.economics,
      date: "2025-03-10",
      readTime: "1 min read",
      image: "/Articula_map_Usa.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">{t.blogTitle}</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance">{t.blogSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 text-balance">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" className="w-full group">
                      {t.readArticle}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">{t.neverMissUpdate}</CardTitle>
              <CardDescription className="text-primary-foreground/80">{t.subscribeNewsletter}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/newsletter" className="block">
                <Button size="lg" variant="secondary" className="w-full">
                  {t.subscribeToNewsletter}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
