import { SectionHeader } from "../components/SectionHeader";
import { KyleGallery } from "../components/KyleGallery";
import { kyleGallery, kyleGallerySection } from "../data/kyleGallery";
import { site } from "../data/site";
import "./AboutPage.css";

export function AboutPage() {
  return (
    <div className="page">
      <div className="page-inner">
        <section className="section">
          <SectionHeader title="About me" subtitle={site.title} />
          <div className="prose about-page__bio">
            {site.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeader
            title={kyleGallerySection.title}
            subtitle={kyleGallerySection.subtitle}
          />
          <div className="about-page__gallery">
            <KyleGallery images={kyleGallery} size="large" />
          </div>
        </section>
      </div>
    </div>
  );
}
