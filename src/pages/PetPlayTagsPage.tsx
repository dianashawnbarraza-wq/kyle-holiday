import { SectionHeader } from "../components/SectionHeader";
import { CTAButton } from "../components/CTAButton";
import { KyleGallery } from "../components/KyleGallery";
import { TagGallery } from "../components/TagGallery";
import {
  tagFaq,
  tagGallery,
  tagHallOfFame,
  tagIntro,
  tagIntroImage,
} from "../data/tags";
import { site } from "../data/site";
import "./PetPlayTagsPage.css";

export function PetPlayTagsPage() {
  return (
    <div className="page">
      <div className="page-inner">
        <SectionHeader
          title="Pet Play Tags"
          subtitle="Laser-cut, engraved, and handmade in Los Angeles"
          level={1}
        />

        <section className="section tags-intro">
          <div className="tags-intro__text prose">
            <p>{tagIntro}</p>
            <div className="cta-group">
              <CTAButton href={site.etsy} external>
                Shop Pet Play Tags on Etsy
              </CTAButton>
            </div>
          </div>
          <div className="tags-intro__image">
            <img
              src={tagIntroImage.src}
              alt={tagIntroImage.alt}
              className="tags-intro__photo"
            />
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
  );
}
