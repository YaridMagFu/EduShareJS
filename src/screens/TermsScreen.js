import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Términos y Condiciones de Uso de EduShareJs</Text>
        
        <Text style={styles.sectionTitle}>1. Introducción</Text>
        <Text style={styles.paragraph}>
          Bienvenido a EduShareJs, una aplicación educativa desarrollada para facilitar la interacción entre docentes y alumnos a través de chats y la gestión de archivos educativos. Al utilizar esta aplicación, los usuarios aceptan los presentes términos y condiciones. Si no está de acuerdo, no debe registrarse ni utilizar los servicios ofrecidos. Estos términos pueden actualizarse periódicamente, y el uso continuado de la aplicación implica la aceptación de las modificaciones.
        </Text>

        <Text style={styles.sectionTitle}>2. Registro de Usuario</Text>
        <Text style={styles.paragraph}>
          Para acceder a EduShareJs, es necesario registrarse con un correo electrónico y seleccionar un rol, ya sea Docente o Alumno. Al registrarse, el usuario se compromete a proporcionar información veraz y actualizada.
        </Text>
        <Text style={styles.bullet}>• Docentes: Para registrarse como docente, se requiere un código específico proporcionado por la institución Jutta Steiner de Toruño o los moderadores de la aplicación. Este código es intransferible y garantiza que solo personal autorizado pueda acceder con el rol de docente.</Text>
        <Text style={styles.bullet}>• Alumnos: Los estudiantes deben registrarse indicando su año académico (1°, 2° o 3° año). La información proporcionada será utilizada para asignar el acceso correspondiente a los chats y archivos.</Text>

        <Text style={styles.sectionTitle}>3. Privacidad y Protección de Datos</Text>
        <Text style={styles.paragraph}>
          EduShareJs utiliza Firebase para la autenticación y manejo de datos. Toda la información personal proporcionada por los usuarios es privada y solo será visible por el propio usuario, excepto en los casos indicados en estos términos.
        </Text>
        <Text style={styles.bullet}>• Acceso de moderadores: Los moderadores tienen acceso a los mensajes de los chats para monitorear y evitar conductas inapropiadas, tales como acoso, insultos o denigración.</Text>
        <Text style={styles.bullet}>• Filtro de lenguaje soez: EduShareJs cuenta con un filtro de lenguaje que detecta insultos y lenguaje inapropiado en los chats. Este filtro puede ser actualizado si surgen nuevas formas de ofensa no detectadas originalmente.</Text>
        <Text style={styles.bullet}>• Protección de datos: Los datos personales serán almacenados de forma segura mediante las políticas predeterminadas de Firebase, y no se compartirán con terceros sin el consentimiento explícito del usuario.</Text>

        <Text style={styles.sectionTitle}>4. Roles y Acceso</Text>
        <Text style={styles.paragraph}>
          En EduShareJs, los usuarios tienen diferentes privilegios según el rol seleccionado al momento de registro:
        </Text>
        <Text style={styles.bullet}>• Docentes: Los docentes pueden subir archivos en los apartados de 1°, 2° y 3° año, y participar en todos los chats. Son responsables de garantizar que el contenido que suban sea estrictamente educativo.</Text>
        <Text style={styles.bullet}>• Alumnos: Los alumnos pueden ver y descargar archivos, pero no pueden subir contenido. Su acceso a los chats varía según su año académico:</Text>
        <Text style={styles.subBullet}>o 1° año: Acceso a los chats de 1° año y Global.</Text>
        <Text style={styles.subBullet}>o 2° año: Acceso a los chats de 1°, 2° año y Global.</Text>
        <Text style={styles.subBullet}>o 3° año: Acceso a todos los chats (1°, 2°, 3° año y Global).</Text>

        <Text style={styles.sectionTitle}>5. Chats</Text>
        <Text style={styles.paragraph}>
          EduShareJs incluye los siguientes chats: 1° año, 2° año, 3° año y Global. El acceso a estos chats está determinado por el año académico del alumno o por el rol de docente. En los chats se espera un comportamiento respetuoso.
        </Text>
        <Text style={styles.bullet}>• Normas de comportamiento: Está prohibido el uso de lenguaje ofensivo, acosador o discriminatorio. Los moderadores revisarán los mensajes para asegurar que se cumplan estas normas. Los usuarios que violen estas reglas podrán ser sancionados, incluyendo la suspensión o eliminación de su cuenta.</Text>
        <Text style={styles.bullet}>• Filtros y moderación: Los mensajes que contengan lenguaje soez serán bloqueados automáticamente. Cualquier intento de eludir este filtro será considerado una violación de los términos y condiciones.</Text>

        <Text style={styles.sectionTitle}>6. Subida de Archivos</Text>
        <Text style={styles.paragraph}>
          Los docentes tienen la capacidad de subir archivos educativos a los apartados de 1°, 2° y 3° año. Los archivos deben ser exclusivamente de carácter educativo, como guías de estudio, materiales de respaldo o documentos relacionados con el aprendizaje.
        </Text>
        <Text style={styles.bullet}>• Tipos de archivos permitidos: Solo se permite la subida de archivos en formatos compatibles con la enseñanza, como PDF, imágenes, presentaciones y documentos de texto. Cualquier otro tipo de archivo será revisado por los moderadores.</Text>
        <Text style={styles.bullet}>• Responsabilidad del contenido: Los docentes son responsables de garantizar que el contenido que suban cumpla con los términos de uso de EduShareJs. Si un archivo no es adecuado, los moderadores pueden eliminarlo, y la cuenta del docente puede ser suspendida.</Text>
        <Text style={styles.bullet}>• Alumnos: Los alumnos no pueden subir archivos, pero tienen acceso a la visualización y descarga de los archivos subidos por los docentes.</Text>

        <Text style={styles.sectionTitle}>7. Condiciones de Uso</Text>
        <Text style={styles.bullet}>• Contenido inapropiado: Se prohíbe la subida de archivos o la inclusión de enlaces a contenido inapropiado, como material no educativo o que infrinja derechos de autor. Cualquier usuario que viole estas normas será sancionado.</Text>
        <Text style={styles.bullet}>• Revisión de archivos: Los moderadores revisarán los archivos subidos de manera aleatoria o cuando reciban reportes. Si se detecta una infracción, el archivo será eliminado, y el usuario responsable podrá ser sancionado.</Text>
        <Text style={styles.bullet}>• Licencia del contenido: Al subir archivos, los usuarios otorgan a EduShareJs una licencia no exclusiva para mostrar estos archivos dentro de la plataforma para uso educativo.</Text>

        <Text style={styles.sectionTitle}>8. Moderación y Sanciones</Text>
        <Text style={styles.paragraph}>
          EduShareJs cuenta con un equipo de moderadores que supervisa las actividades dentro de la aplicación para garantizar un entorno seguro y educativo. Los usuarios que violen los términos y condiciones, ya sea en los chats o en la subida de archivos, podrán enfrentar las siguientes sanciones:
        </Text>
        <Text style={styles.bullet}>• Advertencia: Los usuarios recibirán una advertencia por primera violación.</Text>
        <Text style={styles.bullet}>• Suspensión temporal: Las cuentas pueden ser suspendidas temporalmente en caso de violaciones graves o reincidentes.</Text>
        <Text style={styles.bullet}>• Eliminación de cuenta: Los usuarios que publiquen contenido inapropiado de manera deliberada, incluyan enlaces a material prohibido o realicen conductas abusivas serán eliminados de la plataforma sin previo aviso.</Text>

        <Text style={styles.sectionTitle}>9. Limitación de Responsabilidad</Text>
        <Text style={styles.paragraph}>
          EduShareJs no se hace responsable de las interrupciones del servicio o de la pérdida de datos debido a fallos técnicos. Aunque se toman medidas para proteger la seguridad de la plataforma, no se garantiza una protección absoluta contra posibles vulnerabilidades o accesos no autorizados.
        </Text>

        <Text style={styles.sectionTitle}>10. Modificaciones de los Términos</Text>
        <Text style={styles.paragraph}>
          EduShareJs se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones se notificarán a los usuarios mediante un aviso dentro de la aplicación o por correo electrónico. El uso continuado de la aplicación después de las modificaciones implica la aceptación de los nuevos términos.
        </Text>

        <Text style={styles.sectionTitle}>11. Jurisdicción</Text>
        <Text style={styles.paragraph}>
          Estos términos y condiciones se rigen por las leyes de El Salvador. Cualquier disputa relacionada con el uso de la aplicación será resuelta en los tribunales competentes de dicha jurisdicción.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  subBullet: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
  },
});