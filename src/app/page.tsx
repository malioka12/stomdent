"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100">
      {/* Hero секция */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Текстовая часть */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span>🦷</span>
                Ваша улыбка в надёжных руках
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Здоровая улыбка — 
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  {" "}ваша уверенность
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Современная стоматология <strong>StomDent</strong> предлагает безболезненное лечение, 
                протезирование и эстетическую стоматологию с гарантией качества
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  as={Link}
                  href="/login"
                  color="primary" 
                  variant="solid" 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 rounded-2xl font-semibold hover:scale-105"
                >
                  📅 Записаться на приём
                </Button>
                
                <Button 
                  as={Link}
                  href="/about"
                  color="default" 
                  variant="bordered" 
                  size="lg"
                  className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 py-6 rounded-2xl font-semibold"
                >
                  ℹ️ О клинике
                </Button>
              </div>

              {/* Статистика */}
              <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-gray-600 text-sm">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5,000+</div>
                  <div className="text-gray-600 text-sm">довольных пациентов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-gray-600 text-sm">успешных процедур</div>
                </div>
              </div>
            </div>

            {/* Изображение/иллюстрация */}
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 text-white text-center shadow-2xl">
                <div className="text-6xl mb-4">😄</div>
                <h3 className="text-2xl font-bold mb-2">Бесплатная консультация</h3>
                <p className="text-blue-100 mb-4">Первичный осмотр и план лечения</p>
                <div className="text-3xl font-bold">0 ₸</div>
              </div>
              
              {/* Плавающие элементы */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">👍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Полный спектр стоматологических услуг для всей семьи
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🦷", title: "Терапия", desc: "Лечение кариеса, пульпита, периодонтита" },
              { icon: "🌟", title: "Эстетика", desc: "Отбеливание, виниры, художественная реставрация" },
              { icon: "🦴", title: "Имплантация", desc: "Восстановление утраченных зубов" },
              { icon: "👶", title: "Детская стоматология", desc: "Лечение и профилактика для детей" },
              { icon: "🌀", title: "Ортодонтия", desc: "Исправление прикуса брекетами и элайнерами" },
              { icon: "💎", title: "Протезирование", desc: "Коронки, мосты, съёмные протезы" }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы к ослепительной улыбке?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Запишитесь на бесплатную консультацию и получите профессиональный план лечения
          </p>
          <Button 
            as={Link}
            href="/login"
            color="primary" 
            variant="solid" 
            size="lg"
            className="bg-white text-cyan-600 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-6 rounded-2xl font-bold hover:scale-105"
          >
            🦷 Начать лечение
          </Button>
        </div>
      </section>
    </main>
  );
}