"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from "@heroui/react";

// ========== Context ==========
type AuthMode = "login" | "register";

interface AuthModalContextType {
  openModal: (mode: AuthMode) => void;
  closeModal: () => void;
  isOpen: boolean;
  mode: AuthMode;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const openModal = (newMode: AuthMode) => {
    setMode(newMode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal, isOpen, mode }}>
      {children}
      <AuthModalComponent />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}

// ========== Modal Component ==========
interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

function AuthModalComponent() {
  const { isOpen, closeModal, mode: contextMode } = useAuthModal();
  const [mode, setMode] = useState<AuthMode>(contextMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMode(contextMode);
    }
  }, [contextMode, isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === "register") {
      if (!formData.name.trim()) {
        newErrors.name = "Имя обязательно для заполнения";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен для заполнения";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    if (mode === "register") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Подтвердите пароль";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const submitData = mode === "login"
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      console.log("Данные формы:", submitData);
      alert("Форма отправлена!");

      setIsSubmitting(false);
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    closeModal();
  };

  const handleModeSwitch = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку для этого поля при вводе
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    // При потере фокуса валидируем поле
    validateField(field);
  };

  const validateField = (field: string) => {
    let error = "";
    const value = formData[field as keyof typeof formData];
    
    switch (field) {
      case "name":
        if (mode === "register" && !value.trim()) {
          error = "Имя обязательно для заполнения";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email обязателен для заполнения";
        } else if (!validateEmail(value)) {
          error = "Введите корректный email";
        }
        break;
      case "password":
        if (!value) {
          error = "Пароль обязателен для заполнения";
        } else if (value.length < 6) {
          error = "Пароль должен содержать минимум 6 символов";
        }
        break;
      case "confirmPassword":
        if (mode === "register") {
          if (!value) {
            error = "Подтвердите пароль";
          } else if (value !== formData.password) {
            error = "Пароли не совпадают";
          }
        }
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div key="modal" className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-800/60 overflow-hidden z-10 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

            {/* Header with Title and Close Button */}
            <div className="relative pt-6 px-6 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pr-10">
                {mode === "login" ? "Вход в аккаунт" : "Создать аккаунт"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                {mode === "login" 
                  ? "Войдите, чтобы продолжить" 
                  : "Зарегистрируйтесь для доступа ко всем функциям"}
              </p>
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-20 p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 group"
                aria-label="Закрыть"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 pb-2">
              <div className="flex rounded-xl bg-gray-100/80 dark:bg-gray-800/50 p-1 mb-6">
                <button
                  onClick={() => handleModeSwitch("login")}
                  className={`flex-1 px-4 py-3 text-center font-semibold text-sm transition-all duration-300 relative rounded-lg ${
                    mode === "login"
                      ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="relative z-10">Вход</span>
                  {mode === "login" && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => handleModeSwitch("register")}
                  className={`flex-1 px-4 py-3 text-center font-semibold text-sm transition-all duration-300 relative rounded-lg ${
                    mode === "register"
                      ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <span className="relative z-10">Регистрация</span>
                  {mode === "register" && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-6 pb-8">
              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-2">
                        Имя
                        <Input
                          type="text"
                          
                          placeholder="Введите ваше имя"
                          value={formData.name}
                          onValueChange={(value) => handleInputChange("name", value)}
                          onBlur={() => handleBlur("name")}
                          isInvalid={!!errors.name}
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          classNames={{
                            input: "text-gray-900 dark:text-gray-100 text-[15px]",
                            label: "text-gray-700 dark:text-gray-300 font-medium text-sm mb-1.5",
                            inputWrapper: `border-2 ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800/50 data-[hover=true]:border-blue-400 data-[focus=true]:border-blue-500 transition-all duration-200 shadow-sm`,
                          }}
                        />
                        {/* Кастомное сообщение об ошибке */}
                        {errors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 mt-1.5"
                          >
                            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-red-500 dark:text-red-400">{errors.name}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div className="mb-2">
                    Email
                    <Input
                      type="email"
                
                      placeholder="example@mail.com"
                      value={formData.email}
                      onValueChange={(value) => handleInputChange("email", value)}
                      onBlur={() => handleBlur("email")}
                      isInvalid={!!errors.email}
                      variant="bordered"
                      size="lg"
                      radius="lg"
                      classNames={{
                        input: "text-gray-900 dark:text-gray-100 text-[15px]",
                        label: "text-gray-700 dark:text-gray-300 font-medium text-sm mb-1.5",
                        inputWrapper: `border-2 ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800/50 data-[hover=true]:border-blue-400 data-[focus=true]:border-blue-500 transition-all duration-200 shadow-sm`,
                      }}
                    />
                    {/* Кастомное сообщение об ошибке */}
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1.5"
                      >
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-red-500 dark:text-red-400">{errors.email}</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="mb-2">
                    Пароль
                    <Input
                      type="password"
                      
                      placeholder="Минимум 6 символов"
                      value={formData.password}
                      onValueChange={(value) => handleInputChange("password", value)}
                      onBlur={() => handleBlur("password")}
                      isInvalid={!!errors.password}
                      variant="bordered"
                      size="lg"
                      radius="lg"
                      classNames={{
                        input: "text-gray-900 dark:text-gray-100 text-[15px]",
                        label: "text-gray-700 dark:text-gray-300 font-medium text-sm mb-1.5",
                        inputWrapper: `border-2 ${errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800/50 data-[hover=true]:border-blue-400 data-[focus=true]:border-blue-500 transition-all duration-200 shadow-sm`,
                      }}
                    />
                    {/* Кастомное сообщение об ошибке */}
                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1.5"
                      >
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-red-500 dark:text-red-400">{errors.password}</span>
                      </motion.div>
                    )}
                  </div>

                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-2">
                        Подтвердите пароль
                        <Input
                          type="password"
                      
                          placeholder="Повторите пароль"
                          value={formData.confirmPassword}
                          onValueChange={(value) => handleInputChange("confirmPassword", value)}
                          onBlur={() => handleBlur("confirmPassword")}
                          isInvalid={!!errors.confirmPassword}
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          classNames={{
                            input: "text-gray-900 dark:text-gray-100 text-[15px]",
                            label: "text-gray-700 dark:text-gray-300 font-medium text-sm mb-1.5",
                            inputWrapper: `border-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-gray-800/50 data-[hover=true]:border-blue-400 data-[focus=true]:border-blue-500 transition-all duration-200 shadow-sm`,
                          }}
                        />
                        {/* Кастомное сообщение об ошибке */}
                        {errors.confirmPassword && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 mt-1.5"
                          >
                            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs text-red-500 dark:text-red-400">{errors.confirmPassword}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      radius="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {mode === "login" ? "Войти" : "Зарегистрироваться"}
                    </Button>
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}