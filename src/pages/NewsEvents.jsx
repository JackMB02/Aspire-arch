import { useState } from "react";
import AnimatedSection from '../components/AnimatedSection';

function NewsEvents() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const newsArticles = [
    {
      id: 1,
      title: "New Sustainable Architecture Award",
      date: "May 15, 2023",
      author: "Sarah Johnson",
      excerpt: "Our firm has been recognized for innovative sustainable design in the Urban Green Park project...",
      image: "/images/park.jpg",
      category: "news",
      readTime: "3 min read",
      content: [
        {
          type: "paragraph",
          text: "We are thrilled to announce that Aspire Architecture has been awarded the prestigious Sustainable Design Award for our innovative work on the Urban Green Park project. This recognition highlights our commitment to creating environmentally conscious spaces that harmonize with their natural surroundings."
        },
        {
          type: "paragraph",
          text: "The Urban Green Park project transformed a previously underutilized urban area into a vibrant community space that incorporates native vegetation, sustainable drainage systems, and energy-efficient lighting. Our design approach focused on creating a space that not only serves the community but also contributes positively to the local ecosystem."
        },
        {
          type: "image",
          src: "/images/park2.jpg",
          caption: "The award-winning Urban Green Park featuring sustainable design elements"
        },
        {
          type: "paragraph",
          text: "The judging panel particularly praised our use of recycled materials in the construction and the innovative rainwater harvesting system that reduces the park's water consumption by 65%. This project exemplifies our philosophy that sustainable design can be both beautiful and functional."
        }
      ]
    },
    {
      id: 2,
      title: "Future of Urban Living Conference",
      date: "June 2, 2023",
      author: "Michael Chen",
      excerpt: "Join our lead architects as they discuss the future of sustainable urban development...",
      image: "/images/library.jpg",
      category: "event",
      readTime: "5 min read",
      content: [
        {
          type: "paragraph",
          text: "Join us for an exclusive conference on the Future of Urban Living, where leading architects, urban planners, and sustainability experts will explore innovative approaches to creating more livable, sustainable cities."
        },
        {
          type: "paragraph",
          text: "The conference will feature keynote presentations from renowned thought leaders, interactive workshops, and panel discussions addressing the most pressing challenges in urban design. Topics will include sustainable infrastructure, community-centered design, adaptive reuse of existing structures, and technological innovations in architecture."
        },
        {
          type: "image",
          src: "/images/conference.jpg",
          caption: "Last year's Urban Living Conference attendees participating in a workshop"
        },
        {
          type: "paragraph",
          text: "Our principal architect, Dr. Elena Rodriguez, will present our firm's research on 'Biophilic Design in Urban Environments,' sharing insights from our recent projects that integrate natural elements into urban settings to improve wellbeing and environmental performance."
        }
      ]
    },
    {
      id: 3,
      title: "Construction Begins on Modern Campus Library",
      date: "April 28, 2023",
      author: "James Wilson",
      excerpt: "After months of planning, construction has officially begun on our innovative campus library design...",
      image: "/images/library2.jpg",
      category: "news",
      readTime: "4 min read",
      content: [
        {
          type: "paragraph",
          text: "We're excited to announce that construction has officially commenced on the Modern Campus Library project at Northwood University. This state-of-the-art facility represents a new era in academic architecture, blending traditional learning spaces with cutting-edge technology and sustainable design principles."
        },
        {
          type: "paragraph",
          text: "The design features an innovative glass façade that maximizes natural light while maintaining energy efficiency, open collaborative spaces that encourage student interaction, and quiet study areas designed for focused work. The library will also include a digital media lab, maker space, and rooftop garden."
        },
        {
          type: "image",
          src: "/images/construction.jpg",
          caption: "Construction underway at the Modern Campus Library site"
        },
        {
          type: "paragraph",
          text: "The project is scheduled for completion in Fall 2024 and is expected to achieve LEED Platinum certification, making it one of the most sustainable educational buildings in the region."
        }
      ]
    },
    {
      id: 4,
      title: "Design Workshop: Community Spaces",
      date: "June 15, 2023",
      author: "Lisa Martinez",
      excerpt: "Participate in our hands-on workshop focused on designing community-centered spaces...",
      image: "/images/housing.jpg",
      category: "event",
      readTime: "2 min read",
      content: [
        {
          type: "paragraph",
          text: "We invite you to join our interactive workshop on designing community-centered spaces, where participants will learn practical approaches to creating public areas that foster connection, engagement, and wellbeing."
        },
        {
          type: "paragraph",
          text: "This hands-on session will guide attendees through the process of designing public spaces that truly serve community needs. You'll learn about participatory design methods, accessibility considerations, and how to incorporate sustainable elements into public space design."
        },
        {
          type: "image",
          src: "/images/workshop.jpg",
          caption: "Previous community design workshop in session"
        },
        {
          type: "paragraph",
          text: "The workshop is open to architects, urban planners, community organizers, and anyone interested in the creation of meaningful public spaces. No prior design experience is necessary - just bring your ideas and enthusiasm for building better communities."
        }
      ]
    }
  ];

  const filteredArticles = activeFilter === "all" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeFilter);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="news-events-page">
        <AnimatedSection>
          <div className="article-wrapper">
            <button onClick={handleBackToList} className="back-button">← Back to News & Events</button>
            
            <article className="article-content">
              <header className="article-header">
                <span className={`article-category ${selectedArticle.category}`}>
                  {selectedArticle.category === "news" ? "News" : "Event"}
                </span>
                <h1 className="article-title">{selectedArticle.title}</h1>
                <div className="article-meta">
                  <span className="article-date">{selectedArticle.date}</span>
                  <span className="article-author">By {selectedArticle.author}</span>
                  <span className="article-read-time">{selectedArticle.readTime}</span>
                </div>
                <img src={selectedArticle.image} alt={selectedArticle.title} className="article-hero-image" />
              </header>

              <div className="article-body">
                {selectedArticle.content.map((item, index) => {
                  if (item.type === "paragraph") {
                    return <p key={index} className="article-paragraph">{item.text}</p>;
                  } else if (item.type === "image") {
                    return (
                      <figure key={index} className="article-figure">
                        <img src={item.src} alt={item.caption} />
                        <figcaption>{item.caption}</figcaption>
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>

              <footer className="article-footer">
                <div className="article-tags">
                  <span>Tags: </span>
                  <span className="tag">Architecture</span>
                  <span className="tag">Design</span>
                  <span className="tag">{selectedArticle.category === "news" ? "News" : "Event"}</span>
                </div>
              </footer>
            </article>
          </div>
        </AnimatedSection>

        <style>
          {`
          .news-events-page {
            padding: 6rem 2rem 2rem;
            min-height: 100vh;
            background: #f8f9fa;
          }

          .article-wrapper {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          .back-button {
            background: none;
            border: none;
            color: #f97316;
            font-weight: 600;
            cursor: pointer;
            padding: 0;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            transition: color 0.2s ease;
          }

          .back-button:hover {
            color: #e55c00;
          }

          .article-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          .article-header {
            margin-bottom: 2rem;
          }

          .article-category {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .article-category.news {
            background: #f97316;
            color: white;
          }

          .article-category.event {
            background: #3b82f6;
            color: white;
          }

          .article-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: #222;
            margin-bottom: 1rem;
            line-height: 1.3;
          }

          .article-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            color: #666;
            flex-wrap: wrap;
          }

          .article-hero-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 8px;
          }

          .article-body {
            line-height: 1.8;
            color: #333;
          }

          .article-paragraph {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
          }

          .article-figure {
            margin: 2rem 0;
            text-align: center;
          }

          .article-figure img {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
            border-radius: 8px;
          }

          .article-figure figcaption {
            margin-top: 0.5rem;
            font-style: italic;
            color: #666;
            font-size: 0.9rem;
          }

          .article-footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
          }

          .article-tags {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .tag {
            background: #f1f5f9;
            padding: 4px 10px;
            border-radius: 16px;
            font-size: 0.8rem;
            color: #64748b;
          }

          @media (max-width: 768px) {
            .news-events-page {
              padding: 5rem 1rem 1rem;
            }
            
            .article-title {
              font-size: 1.8rem;
            }
            
            .article-hero-image {
              height: 250px;
            }
            
            .article-meta {
              flex-direction: column;
              gap: 0.5rem;
            }
          }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="news-events-page">
      <AnimatedSection>
        <div className="news-page-wrapper">
          <h1 className="news-page-title">News & Events</h1>
          <p className="news-page-description">
            Stay updated with our latest projects, achievements, and upcoming events. 
            Explore our architectural journey and connect with us.
          </p>
          
          <div className="news-filters">
            <button 
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === "news" ? "active" : ""}`}
              onClick={() => setActiveFilter("news")}
            >
              News
            </button>
            <button 
              className={`filter-btn ${activeFilter === "event" ? "active" : ""}`}
              onClick={() => setActiveFilter("event")}
            >
              Events
            </button>
          </div>
          
          <div className="news-grid">
            {filteredArticles.map(article => (
              <div key={article.id} className="news-card">
                <div className="news-image">
                  <img src={article.image} alt={article.title} />
                  <span className={`news-badge ${article.category}`}>
                    {article.category === "news" ? "News" : "Event"}
                  </span>
                </div>
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <div className="news-meta">
                    <span className="news-date">{article.date}</span>
                    <span className="news-read-time">{article.readTime}</span>
                  </div>
                  <p className="news-excerpt">{article.excerpt}</p>
                  <button 
                    className="news-read-more"
                    onClick={() => handleReadMore(article)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <style>
        {`
        .news-events-page {
          padding: 6rem 2rem 2rem;
          min-height: 100vh;
          background: #f8f9fa;
        }

        .news-page-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .news-page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 1rem;
        }

        .news-page-description {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 800px;
        }

        .news-filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .filter-btn {
          padding: 8px 20px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
        }

        .filter-btn:hover {
          border-color: #f97316;
          color: #f97316;
        }

        .filter-btn.active {
          background: #f97316;
          color: white;
          border-color: #f97316;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .news-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .news-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .news-card:hover .news-image img {
          transform: scale(1.05);
        }

        .news-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .news-badge.news {
          background: #f97316;
          color: white;
        }

        .news-badge.event {
          background: #3b82f6;
          color: white;
        }

        .news-content {
          padding: 1.5rem;
        }

        .news-content h3 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: #222;
          line-height: 1.4;
        }

        .news-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }

        .news-date {
          color: #666;
        }

        .news-read-time {
          color: #888;
        }

        .news-excerpt {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .news-read-more {
          background: none;
          border: none;
          color: #f97316;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
        }

        .news-read-more:hover {
          color: #e55c00;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .news-events-page {
            padding: 5rem 1rem 1rem;
          }
          
          .news-page-title {
            font-size: 2rem;
          }
          
          .news-grid {
            grid-template-columns: 1fr;
          }
          
          .news-filters {
            justify-content: center;
          }
        }
        `}
      </style>
    </div>
  );
}

export default NewsEvents;