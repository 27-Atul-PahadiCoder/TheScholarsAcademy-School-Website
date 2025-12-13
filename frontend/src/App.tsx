import { Suspense, lazy } from "react";
import type { ComponentType } from "react";
import { TopStrip } from "./components/shared/TopStrip";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import ScholarsAcademyPage from "./components/pages/BioSection";
import { Hero } from "./components/shared/Hero";
import { AgendaSection } from "./components/sections/AgendaSection";
import { AcademicsSection } from "./components/academics/AcademicsSection";
import { CampusSection } from "./components/campus/CampusSection";
import { AdmissionsSection } from "./components/admissions/AdmissionsSection";
import { ContactSection } from "./components/contact/ContactSection";
import { useScrollReveal } from "./hooks/useScrollReveal";

const lazyNamedComponent = (
  importer: () => Promise<Record<string, unknown>>,
  exportName: string
) =>
  lazy(async () => {
    const module = await importer();
    const Component = module[exportName];
    if (typeof Component !== "function") {
      throw new Error(
        `Component "${exportName}" is not available for lazy loading.`
      );
    }
    return { default: Component as ComponentType<any> };
  });

const lazyPages = {
  about: lazyNamedComponent(
    () => import("./components/pages/AboutUs"),
    "AboutUs"
  ),
  vision: lazyNamedComponent(
    () => import("./components/pages/OurVision"),
    "OurVision"
  ),
  founders: lazyNamedComponent(
    () => import("./components/pages/FoundersMessage"),
    "FoundersMessage"
  ),
  staff: lazyNamedComponent(
    () => import("./components/pages/OurStaff"),
    "OurStaff"
  ),
  management: lazyNamedComponent(
    () => import("./components/pages/OurManagement"),
    "OurManagement"
  ),
  learning: lazyNamedComponent(
    () => import("./components/pages/TheLearning"),
    "TheLearning"
  ),
  academicsCurriculum: lazyNamedComponent(
    () => import("./components/academics/AcademicsCurriculum"),
    "AcademicsCurriculum"
  ),
  academicsFaculty: lazyNamedComponent(
    () => import("./components/academics/AcademicsFaculty"),
    "AcademicsFaculty"
  ),
  academicsResults: lazyNamedComponent(
    () => import("./components/academics/AcademicsResults"),
    "AcademicsResults"
  ),
  academicsPrograms: lazyNamedComponent(
    () => import("./components/academics/AcademicsPrograms"),
    "AcademicsPrograms"
  ),
  sports: lazyNamedComponent(
    () => import("./components/beyond/Sports"),
    "Sports"
  ),
  gamifiedLearning: lazyNamedComponent(
    () => import("./components/Gamefied-Learning/components/ScholarsApp"),
    "default"
  ),
  arts: lazyNamedComponent(
    () => import("./components/beyond/ArtsCulture"),
    "ArtsCulture"
  ),
  clubs: lazyNamedComponent(
    () => import("./components/beyond/ClubsSocieties"),
    "ClubsSocieties"
  ),
  community: lazyNamedComponent(
    () => import("./components/beyond/CommunityService"),
    "CommunityService"
  ),
  admissionsProcess: lazyNamedComponent(
    () => import("./components/admissions/AdmissionsProcess"),
    "AdmissionsProcess"
  ),
  admissionsFees: lazyNamedComponent(
    () => import("./components/admissions/AdmissionsFees"),
    "AdmissionsFees"
  ),
  admissionsRequirements: lazyNamedComponent(
    () => import("./components/admissions/AdmissionsRequirements"),
    "AdmissionsRequirements"
  ),
  admissionsContact: lazyNamedComponent(
    () => import("./components/admissions/AdmissionsContact"),
    "AdmissionsContact"
  ),
  campusFacilities: lazyNamedComponent(
    () => import("./components/campus/CampusFacilities"),
    "CampusFacilities"
  ),
  campusAccommodation: lazyNamedComponent(
    () => import("./components/campus/CampusAccommodation"),
    "CampusAccommodation"
  ),
  campusEvents: lazyNamedComponent(
    () => import("./components/campus/CampusEvents"),
    "CampusEvents"
  ),
  campusGallery: lazyNamedComponent(
    () => import("./components/campus/SchoolGallery"),
    "SchoolGallery"
  ),
  contactOffice: lazyNamedComponent(
    () => import("./components/contact/ContactOffice"),
    "ContactOffice"
  ),
  contactAdmissions: lazyNamedComponent(
    () => import("./components/contact/ContactAdmissions"),
    "ContactAdmissions"
  ),
  contactSupport: lazyNamedComponent(
    () => import("./components/contact/ContactSupport"),
    "ContactSupport"
  ),
  contactForm: lazyNamedComponent(
    () => import("./components/contact/ContactForm"),
    "ContactForm"
  ),
  admin: lazyNamedComponent(
    () => import("./components/admin/AdminDashboard"),
    "AdminDashboard"
  ),
  adminMedia: lazyNamedComponent(
    () => import("./components/MediaComponent/AdminMediaDashboard"),
    "default"
  ),
};

type RouteConfig = {
  component: ComponentType<any>;
  standalone?: boolean;
};

const routedPages: Record<string, RouteConfig> = {
  "/admin": { component: lazyPages.admin, standalone: true },
  "/admin/media": { component: lazyPages.adminMedia, standalone: true },
  "/about-us": { component: lazyPages.about },
  "/our-vision": { component: lazyPages.vision },
  "/founders-message": { component: lazyPages.founders },
  "/our-staff": { component: lazyPages.staff },
  "/our-management": { component: lazyPages.management },
  "/academics-curriculum": { component: lazyPages.academicsCurriculum },
  "/academics-faculty": { component: lazyPages.academicsFaculty },
  "/academics-results": { component: lazyPages.academicsResults },
  "/academics-programs": { component: lazyPages.academicsPrograms },
  "/theLearning": { component: lazyPages.learning },
  "/sports": { component: lazyPages.sports },
  "/gamified-learning": { component: lazyPages.gamifiedLearning },
  "/arts-culture": { component: lazyPages.arts },
  "/clubs-societies": { component: lazyPages.clubs },
  "/community-service": { component: lazyPages.community },
  "/admissions-process": { component: lazyPages.admissionsProcess },
  "/admissions-fees": { component: lazyPages.admissionsFees },
  "/admissions-requirements": {
    component: lazyPages.admissionsRequirements,
  },
  "/admissions-contact": { component: lazyPages.admissionsContact },
  "/campus-facilities": { component: lazyPages.campusFacilities },
  "/campus-accommodation": { component: lazyPages.campusAccommodation },
  "/campus-events": { component: lazyPages.campusEvents },
  "/campus-gallery": { component: lazyPages.campusGallery },
  "/contact-office": { component: lazyPages.contactOffice },
  "/contact-admissions": { component: lazyPages.contactAdmissions },
  "/contact-support": { component: lazyPages.contactSupport },
  "/contact-form": { component: lazyPages.contactForm },
};

function renderLazyPage(Component: ComponentType<any>, standalone = false) {
  const content = (
    <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
      <Component />
    </Suspense>
  );

  if (standalone) {
    return content;
  }

  return (
    <div className="min-h-screen flex flex-col" id="top">
      <TopStrip />
      <Header />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  useScrollReveal();
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  const route = routedPages[path];

  if (route) {
    return renderLazyPage(route.component, route.standalone);
  }

  // Default home page
  return (
    <div className="min-h-screen flex flex-col" id="top">
      <TopStrip />
      <Header />
      <main className="flex-1">
        <ScholarsAcademyPage />
        <Hero />
        <AgendaSection />
        <AcademicsSection />
        <CampusSection />
        <AdmissionsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
