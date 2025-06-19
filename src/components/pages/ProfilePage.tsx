
import React from 'react';
import { User } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="pt-20 pb-20 px-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold">João Silva</h2>
        <p className="text-gray-600">joao.silva@email.com</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-3">Configurações da Conta</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 border-b border-gray-100">Editar Perfil</button>
            <button className="w-full text-left py-2 border-b border-gray-100">Endereços</button>
            <button className="w-full text-left py-2 border-b border-gray-100">Métodos de Pagamento</button>
            <button className="w-full text-left py-2">Notificações</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-3">Suporte</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 border-b border-gray-100">Central de Ajuda</button>
            <button className="w-full text-left py-2 border-b border-gray-100">Fale Conosco</button>
            <button className="w-full text-left py-2">Sobre o App</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
