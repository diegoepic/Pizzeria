<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();


include $_SERVER['DOCUMENT_ROOT'] . '/visibility2/portal/con_.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = trim($_POST['usuario']);
    $clave = $_POST['clave'];

    $stmt = $conn->prepare("
        SELECT 
            u.id,
            u.rut,
            u.nombre,
            u.apellido,
            u.email,
            u.usuario,
            u.fotoPerfil,
            u.clave,
            u.id_perfil,
            u.id_empresa,
            u.id_division,
            u.login_count,
            p.nombre AS perfil_nombre,
            e.nombre AS empresa_nombre
        FROM usuario AS u
        INNER JOIN perfil AS p ON p.id = u.id_perfil
        INNER JOIN empresa AS e ON e.id = u.id_empresa
        WHERE (u.rut = ? OR u.usuario = ?) AND u.activo = 1
        LIMIT 1
    ");
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $conn->error);
    }

    $stmt->bind_param("ss", $usuario, $usuario);
    if (!$stmt->execute()) {
        die("Error en la ejecución de la consulta: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result === false) {
        die("Error al obtener el resultado: " . $stmt->error);
    }

    if ($result->num_rows === 1) {
        $usuario_data = $result->fetch_assoc();
        if (!$usuario_data) {
            die("Error al obtener los datos del usuario.");
        }

        if (!isset($usuario_data['clave'])) {
            die("La clave del usuario no está disponible.");
        }

        if (password_verify($clave, $usuario_data['clave'])) {
            //variables de sesión
            $_SESSION['usuario_id'] = $usuario_data['id'];
            $_SESSION['usuario_nombre'] = $usuario_data['nombre'];
            $_SESSION['usuario_apellido'] = $usuario_data['apellido'];
            $_SESSION['usuario_fotoPerfil'] = $usuario_data['fotoPerfil'];
            $_SESSION['usuario_perfil'] = $usuario_data['id_perfil'];
            $_SESSION['perfil_nombre'] = $usuario_data['perfil_nombre'];
            $_SESSION['empresa_nombre'] = $usuario_data['empresa_nombre'];
            $_SESSION['empresa_id'] = $usuario_data['id_empresa'];

            // aqui se alamacena la división en la sesión
            $_SESSION['division_id'] = isset($usuario_data['id_division']) ? intval($usuario_data['id_division']) : 0;

          
            $update_stmt = $conn->prepare("UPDATE usuario SET login_count = login_count + 1, last_login = NOW() WHERE id = ?");
            if ($update_stmt === false) {
                die("Error en la preparación de la consulta de actualización: " . $conn->error);
            }
            $update_stmt->bind_param("i", $usuario_data['id']);
            if (!$update_stmt->execute()) {
                die("Error en la ejecución de la consulta de actualización: " . $update_stmt->error);
            }

        
            header("Location: index.php");
            exit();
        } else {
            // Contraseña incorrecta
            $_SESSION['error_login'] = "Usuario o contraseña incorrectos.";
            header("Location: login.php");
            exit();
        }
    } else {
        $_SESSION['error_login'] = "Usuario o contraseña incorrectos.";
        header("Location: login.php");
        exit();
    }
} else {
    header("Location: login.php");
    exit();
}
?>