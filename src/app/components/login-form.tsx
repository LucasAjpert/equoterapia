import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import logoImage from 'figma:asset/97c9b82470647ad9dacd0d17ab3d6cb78d90c1e0.png';

export function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = 'Usuário é obrigatório';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulated authentication - replace with real authentication logic
      console.log('Login attempt:', { username, password });
      onLoginSuccess();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop - Lado Esquerdo: Bem-vindo */}
      <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-12">
        <div className="text-center space-y-6">
          <h1 className="text-gray-800 mb-2">Bem-vindo</h1>
          <p className="text-gray-600">Seja bem-vindo</p>
          
          {/* Logo */}
          <div className="flex justify-center mt-8">
            <img 
              src={logoImage} 
              alt="Centro de Equoterapia FMMB" 
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Lado Direito: Login Form */}
      <div className="w-full md:w-1/2 bg-teal-500 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-white text-3xl mb-8 text-center">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuário */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-white text-sm">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white ${
                    errors.username ? 'border-red-500' : 'border-teal-400'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-200 text-sm">{errors.username}</p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white text-sm">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className={`w-full pl-11 pr-11 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white ${
                    errors.password ? 'border-red-500' : 'border-teal-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-200 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full bg-white text-teal-600 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
            >
              Entrar
            </button>

            {/* Esqueci a senha */}
            <div className="text-center mt-4">
              <a href="#" className="text-white hover:text-gray-100 text-sm underline">
                Esqueci a senha
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}