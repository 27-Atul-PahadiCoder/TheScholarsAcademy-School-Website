import {
  Phone,
  ArrowRight,
  Download,
  FileText,
  CheckCircle,
} from "lucide-react";

export function AdmissionsSection() {
  return (
    <section id="admissions" className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">
              Admission
            </div>
            <h2>Ready to join The Scholar&apos;s Academy?</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            Admissions are open for the new academic year. Our team will guide
            you through the complete process — from enquiry to fee structure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-8 shadow-2xl shadow-blue-500/20 mt-4">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-white mb-3">
              How Admission Works
            </h3>
            <p className="text-blue-100 mb-6 max-w-md">
              Whether you are a parent from Pithoragarh or nearby areas, the
              process is straightforward and transparent.
            </p>

            <ul className="space-y-3 text-white mb-8">
              {[
                {
                  title: "Enquiry",
                  description:
                    "Visit or call the school office for an enquiry.",
                },
                {
                  title: "Form Collection",
                  description: "Collect the admission form and prospectus.",
                },
                {
                  title: "Submission & Interaction",
                  description:
                    "Submit documents and complete interaction/assessment.",
                },
                {
                  title: "Confirmation",
                  description:
                    "Confirm admission and complete the fee formalities.",
                },
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-semibold">{step.title}</span>
                    <p className="text-blue-100 text-sm">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="tel:+917525838880"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-green-500 font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span style={{ color: "white" }}>Call Office</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/20 font-semibold hover:bg-white/30 transition-colors"
              >
                <span style={{ color: "white" }}>Visit School</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center">
            <div className="rounded-2xl bg-slate-900/60 p-6 text-sm backdrop-blur-sm border border-slate-700/80 w-full">
              <h4 className="text-xl font-semibold text-white mb-2">
                Transparent Fee Structure
              </h4>
              <p className="mb-4 text-blue-100">
                Fee details are shared clearly with parents along with any
                additional facility charges.
              </p>
              <ul className="space-y-2.5 text-blue-100 mb-6">
                {[
                  "Age-appropriate class placement",
                  "Guidance on transport, uniforms & books",
                  "Parents testimonials available for reference",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 font-semibold hover:bg-blue-600 transition-colors text-sm shadow-md"
                >
                  <Download className="w-4 h-4 " />
                  <span style={{ color: "white" }}>Download Prospectus</span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 font-semibold hover:bg-white/20 transition-colors text-sm border border-white/20"
                >
                  <FileText className="w-4 h-4" />
                  <span style={{ color: "white" }}>View Fee Structure</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
