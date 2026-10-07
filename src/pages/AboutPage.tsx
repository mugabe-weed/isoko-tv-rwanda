import React from 'react';
import { Tv, Award, Users, HeartHandshake, Video, Compass, Sparkles, MapPin, Youtube } from 'lucide-react';
import { TEAM_MEMBERS, CHANNEL_CONFIG } from '../data/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { SubscribeButton } from '../components/SubscribeButton';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-16">
      {/* 1. HERO / CHANNEL STORY */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#181818] via-[#121212] to-[#141414] border border-zinc-800 p-6 sm:p-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e50914]/20 border border-[#e50914]/40 rounded-full text-[#e50914] text-xs font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>Inkuru ya Isoko TV Rwanda</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Umuyoboro w'Imyidagaduro Nyarwanda
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            ISOKO TV RWANDA yavutse ifite inzozi imwe rukumbi: kuba isoko idakama y'amakuru meza, yizewe kandi anyuze mu mucyo ku buzima bw'ibyamamare, umuziki, sinema, n'urwenya mu Rwanda.
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Kuva twatangira uru rugendo, twahaye agaciro ibiganiro by'umwimerere bitubaka urwango, ahubwo biteza imbere impano z'Abanyarwanda kandi bigahuza abakunda igihugu cyabo aho baba bari hose ku isi.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <SubscribeButton size="md" />
            <button
              onClick={() => onNavigate('/contact')}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
            >
              Kuvugana na Studio i Kigali
            </button>
          </div>
        </div>
      </section>

      {/* 2. OUR CORE VALUES / INDANGAGACIRO */}
      <section className="space-y-6">
        <SectionTitle
          title="Indangagaciro Zacu"
          kinyarwandaTitle="Mission & Core Values"
          description="Ibyo tugenderaho mu mwuga wacu wa buri munsi kuri Isoko TV Rwanda."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e50914]/20 text-[#e50914] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">
              Ubuziranenge n'Amashusho Meza (Quality 4K)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dukoresha ibikoresho by'amashusho n'amajwi bigezweho kugira ngo ibiganiro byacu bibe ku rwego mpuzamahanga rushimisha abareba kuri televiziyo nini no kuri telefone.
            </p>
          </div>

          <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e50914]/20 text-[#e50914] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">
              Guteza Imbere Impano Nshya (Talent Promotion)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ntabwo twibanda gusa ku bahanzi bamamaye, ahubwo dufungurira amarembo abakiri bato bafite impano zihariye mu muziki, sinema, n'urwenya mu Rwanda.
            </p>
          </div>

          <div className="p-5 bg-[#141414] rounded-xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e50914]/20 text-[#e50914] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">
              Kugira Ubumwe no Guhuza Diaspora (Global Connect)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Abanyarwanda batuye muri Amerika, Canada, Uburayi n'ahandi hose bishimira Isoko TV nk'ikiraro kibahuza n'ibibera mu rwa Gasabo buri munsi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MEET THE TEAM / ABANAYAMAKURU N'ABAKORA AMASHUSHO */}
      <section className="space-y-6">
        <SectionTitle
          title="Ikipe Yacu"
          kinyarwandaTitle="The Leadership & Production Team"
          description="Abanyamakuru, abayobozi ba gahunda, n'abahanga mu gutunganya amashusho batuma Isoko TV iba intangarugero."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="flex flex-col bg-[#141414] rounded-xl overflow-hidden border border-zinc-800 group hover:border-zinc-700 transition-colors"
            >
              <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3">
                  <span className="text-[10px] font-bold text-[#e50914] uppercase tracking-wider block">
                    {member.kinyarwandaRole}
                  </span>
                  <span className="text-xs text-zinc-300">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-base leading-snug">
                    {member.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KIGALI PRODUCTION HUB & EQUIPMENT */}
      <section className="bg-[#121212] rounded-xl border border-zinc-800 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#e50914] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Studio y'i Kigali</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Aho Dukorera Imirimo n'Ibiganiro
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Studio ya Isoko TV Rwanda iherereye mu mujyi rwagati wa Kigali (Nyarugenge, KN 4 Ave). Dufite studio yakira abashyitsi, acoustic soundproofing, amatara meza ya cinematic, na multi-cam switching system yagenewe gukora live streams nta guhagarara.
            </p>
            <div className="pt-2 text-xs text-zinc-400 space-y-1">
              <div>📍 <strong>Address:</strong> {CHANNEL_CONFIG.address}</div>
              <div>📞 <strong>Telephone:</strong> {CHANNEL_CONFIG.phone}</div>
              <div>✉️ <strong>Email:</strong> {CHANNEL_CONFIG.email}</div>
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=80"
              alt="Isoko TV Rwanda Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-xs font-bold text-white bg-black/70 px-3 py-1 rounded">
                Isoko TV Kigali Studio Live Feed
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
