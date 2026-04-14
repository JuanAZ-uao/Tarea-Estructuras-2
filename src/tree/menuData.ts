import { NaryTree } from "./MenuTree";
import type { MenuNode } from "./MenuTree";
import {
  InicioPage,
  PerfilPage,
  MensajesPage,
  ConfiguracionPage,
  CuentaPage,
  SeguridadPage,
  ContrasenaPage,
  NotificacionesPage,
  AyudaPage,
  PreguntasFrecuentesPage,
  EnviarTicketPage,
  EstadoRedPage,
  CerrarSesionPage,
} from "../pages/Pages";

function createNode(
  title: string,
  link: string,
  component: React.FC
): MenuNode {
  return { title, link, component, children: [] };
}

export function buildMenuTree(): NaryTree {
  const tree = new NaryTree();

  const inicio = createNode("Inicio", "/inicio", InicioPage);
  const perfil = createNode("Perfil", "/perfil", PerfilPage);
  const mensajes = createNode("Mensajes", "/mensajes", MensajesPage);

  const configuracion = createNode("Configuracion", "/configuracion", ConfiguracionPage);
  const cuenta = createNode("Cuenta", "/configuracion/cuenta", CuentaPage);
  const seguridad = createNode("Seguridad y Privacidad", "/configuracion/seguridad", SeguridadPage);
  const contrasena = createNode("Contrasena", "/configuracion/contrasena", ContrasenaPage);
  const notificaciones = createNode("Notificaciones", "/configuracion/notificaciones", NotificacionesPage);

  const ayuda = createNode("Ayuda", "/ayuda", AyudaPage);
  const faqs = createNode("Preguntas Frecuentes", "/ayuda/faqs", PreguntasFrecuentesPage);
  const ticket = createNode("Enviar un Ticket", "/ayuda/ticket", EnviarTicketPage);
  const estadoRed = createNode("Estado de la Red", "/ayuda/estado-red", EstadoRedPage);

  const cerrarSesion = createNode("Cerrar Sesion", "/cerrar-sesion", CerrarSesionPage);

  tree.addNode(null, inicio);
  tree.addNode(null, perfil);
  tree.addNode(null, mensajes);

  tree.addNode(null, configuracion);
  tree.addNode(configuracion, cuenta);
  tree.addNode(configuracion, seguridad);
  tree.addNode(configuracion, contrasena);
  tree.addNode(configuracion, notificaciones);

  tree.addNode(null, ayuda);
  tree.addNode(ayuda, faqs);
  tree.addNode(ayuda, ticket);
  tree.addNode(ayuda, estadoRed);

  tree.addNode(null, cerrarSesion);

  return tree;
}
