import { SectionHeader } from "../components/SectionHeader";
import { KyleGallery } from "../components/KyleGallery";
import { PageHero } from "../components/PageHero";
import { TagGallery } from "../components/TagGallery";
import { tagFaq, tagGallery, tagHallOfFame, tagIntro } from "../data/tags";
import { site } from "../data/site";
import "./PetPlayTagsPage.css";

export function PetPlayTagsPage() {
  return (
    <div className="tags-page">
      <PageHero
        title="Play tags"
        tagline="Laser-cut, engraved, and handmade in Los Angeles"
        image="/images/tags/diet-coke-doll-hero.jpg"
        imageAlt="Red heart pet play tag engraved Diet Coke Dollop on a Kyle Holiday backing card"
        imagePosition="center 28%"
        links={[
          { label: "Santa Kyle's Workshop", href: "/shop" },
          {
            label: "Visit Stockroom",
            href: site.stockroom.url,
            external: true,
          },
        ]}
      />

      <div className="page page--after-hero">
        <div className="page-inner">
          <section className="section tags-intro" id="pet-play-tags">
            <SectionHeader title="Bones, hearts, round tags, and more" />
            <div className="tags-intro__text prose">
              <p>{tagIntro}</p>
            </div>
          </section>

          <section className="section">
            <TagGallery items={tagGallery} />
          </section>

          <section className="section">
            <SectionHeader title="Tag Hall of Fame" />
            <KyleGallery images={tagHallOfFame} />
          </section>

          <section className="section tags-faq">
            <SectionHeader title="Pet Play Tag FAQ" />
            <dl className="tags-faq__list">
              {tagFaq.map((item) => (
                <div key={item.question} className="tags-faq__item">
                  <dt className="tags-faq__question">{item.question}</dt>
                  <dd className="tags-faq__answer">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
