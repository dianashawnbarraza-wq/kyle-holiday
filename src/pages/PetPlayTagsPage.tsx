import { SectionHeader } from "../components/SectionHeader";
import { KyleGallery } from "../components/KyleGallery";
import { TagGallery } from "../components/TagGallery";
import { tagGallery, tagHallOfFame, tagIntro, tagIntroImage } from "../data/tags";
import "./PetPlayTagsPage.css";

export function PetPlayTagsPage() {
  return (
    <div className="page">
      <div className="page-inner">
        <SectionHeader
          title="Pet Play Tags"
          subtitle="Laser-cut, engraved, and handmade in Los Angeles"
        />

        <section className="section tags-intro">
          <div className="tags-intro__text prose">
            <p>{tagIntro}</p>
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
      </div>
    </div>
  );
}
