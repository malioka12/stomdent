"use client";

import { Input, Textarea, Button, Card, CardBody, CardHeader } from "@heroui/react";

export default function Contacts() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-2xl">📞</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Контакты
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами - мы всегда готовы помочь с вашей улыбкой
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Форма обратной связи */}
          <Card className="w-full shadow-2xl border-none bg-white">
            <CardHeader className="pb-0 pt-8 px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Напишите нам</h2>
              <p className="text-gray-600">Заполните форму и мы свяжемся с вами в течение 15 минут</p>
            </CardHeader>

            <CardBody className="flex flex-col gap-6 px-8 pb-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium text-sm">Имя *</label>
                  <Input
                    isRequired
                    type="text"
                    placeholder="Ваше имя"
                    variant="bordered"
                    classNames={{
                      input: "text-base py-3",
                      inputWrapper: "border-gray-300 hover:border-cyan-500"
                    }}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 font-medium text-sm">Телефон *</label>
                  <Input
                    isRequired
                    type="tel"
                    placeholder="+7 (777) 123-45-67"
                    variant="bordered"
                    classNames={{
                      input: "text-base py-3",
                      inputWrapper: "border-gray-300 hover:border-cyan-500"
                    }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium text-sm">Email *</label>
                <Input
                  isRequired
                  type="email"
                  placeholder="your@email.com"
                  variant="bordered"
                  classNames={{
                    input: "text-base py-3",
                    inputWrapper: "border-gray-300 hover:border-cyan-500"
                  }}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium text-sm">Сообщение *</label>
                <Textarea
                  isRequired
                  placeholder="Расскажите о вашей проблеме или вопросе..."
                  variant="bordered"
                  minRows={4}
                  classNames={{
                    input: "text-base resize-none",
                    inputWrapper: "border-gray-300 hover:border-cyan-500"
                  }}
                />
              </div>
              
              <Button 
                color="primary" 
                variant="solid" 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base py-4 rounded-xl font-semibold mt-2 hover:scale-105"
              >
                📨 Отправить сообщение
              </Button>
            </CardBody>
          </Card>

          {/* Контактная информация */}
          <div className="space-y-6">
            {/* Основные контакты */}
            <Card className="shadow-xl border-none bg-white">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Адрес клиники</h4>
                      <p className="text-gray-600 mt-1">г. Нур-Султан, пр. Мангилик Ел, 55</p>
                      <p className="text-gray-500 text-sm mt-1">Вход со стороны парковки</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Телефоны</h4>
                      <p className="text-gray-600 mt-1">+7 (7172) 12-34-56</p>
                      <p className="text-gray-600">+7 (777) 123-45-67 (WhatsApp)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                      <p className="text-gray-600 mt-1">info@stomdent.kz</p>
                      <p className="text-gray-600">appointment@stomdent.kz</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* График работы */}
            <Card className="shadow-xl border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold mb-4">График работы</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-medium">Пн-Пт</span>
                    <span className="font-semibold">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-medium">Суббота</span>
                    <span className="font-semibold">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Воскресенье</span>
                    <span className="font-semibold">10:00 - 16:00</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/20 rounded-xl">
                  <p className="text-white/90 text-sm">
                    <span className="font-semibold">Срочный приём:</span> ежедневно до 22:00
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Экстренная помощь */}
            <Card className="shadow-xl border-none bg-red-50 border border-red-200">
              <CardBody className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <span className="text-red-600 text-lg">🚑</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 text-lg">Срочная помощь</h4>
                    <p className="text-red-600 text-sm">При острой боли - звоните круглосуточно</p>
                  </div>
                </div>
                <Button 
                  variant="flat" 
                  color="danger"
                  className="w-full mt-4 py-3 font-semibold"
                >
                  🚨 Экстренный вызов: +7 (777) 765-43-21
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}