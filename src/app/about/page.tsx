export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-2xl">🦷</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            О нашей клинике
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Основной контент */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              StomDent — современная стоматология с заботой о вашей улыбке
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Более 10 лет мы дарим нашим пациентам здоровые улыбки и уверенность в себе. 
              Используем только современное оборудование и проверенные материалы.
            </p>
            <div className="flex items-center gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">✓</span>
                <span>Лицензия Минздрава</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-500">✓</span>
                <span>Опыт 10+ лет</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">15+ врачей</h3>
                <p className="text-sm text-gray-600">Высококвалифицированных специалистов</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">4.9/5</h3>
                <p className="text-sm text-gray-600">Рейтинг по отзывам пациентов</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">3 филиала</h3>
                <p className="text-sm text-gray-600">В разных районах города</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🕒</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">24/7</h3>
                <p className="text-sm text-gray-600">Стоматология неотложной помощи</p>
              </div>
            </div>
          </div>
        </div>

        {/* Наши ценности */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            Наши принципы работы
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-white text-2xl">💙</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Забота о пациенте</h3>
              <p className="text-gray-600">
                Индивидуальный подход к каждому, комфортное лечение и полное сопровождение
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-white text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Современные технологии</h3>
              <p className="text-gray-600">
                Используем только лучшее оборудование и материалы мировых производителей
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Доступные цены</h3>
              <p className="text-gray-600">
                Прозрачное ценообразование и удобные варианты рассрочки лечения
              </p>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Готовы к здоровой улыбке?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Запишитесь на бесплатную консультацию и получите профессиональную оценку вашего стоматологического здоровья
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Записаться на консультацию
          </button>
        </div>
      </div>
    </main>
  );
}