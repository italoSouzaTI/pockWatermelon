
import CadastroOcorrenciaPage from '@features/ConteudoSync/pages/CadastroOcorrencia';
import CadastroPedidoPage from '@features/ConteudoSync/pages/CadastroPedido';
import { CadastroUsuarioPage } from '@features/ConteudoSync/pages/CadastroUsuario';
import HomePage from '@features/ConteudoSync/pages/Home';
import { ListaConteudoPage } from '@features/ConteudoSync/pages/ListaConteudo';
import { SincronizacaoPage } from '@features/ConteudoSync/pages/Sincronizacao';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ConteudoSyncRoutes = {
  Home: undefined;
  CadastroUsuario: undefined;
  CadastroOcorrencia: undefined;
  CadastroPedido: undefined;
  Sincronizacao: undefined;
  ListaConteudo: undefined;
};

const Stack = createNativeStackNavigator<ConteudoSyncRoutes>();

export default function StackRoute() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: 'Conteúdo Offline' }}
      />
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuarioPage}
        options={{ title: 'Novo Usuário' }}
      />
      <Stack.Screen
        name="CadastroOcorrencia"
        component={CadastroOcorrenciaPage}
        options={{ title: 'Registrar Ocorrência' }}
      />
      <Stack.Screen
        name="CadastroPedido"
        component={CadastroPedidoPage}
        options={{ title: 'Novo Pedido' }}
      />
      <Stack.Screen
        name="Sincronizacao"
        component={SincronizacaoPage}
        options={{ title: 'Sincronizar Dados' }}
      />
      <Stack.Screen
        name="ListaConteudo"
        component={ListaConteudoPage}
        options={{ title: 'Lista Conteúdos' }}
      />
    </Stack.Navigator>
  );
}
