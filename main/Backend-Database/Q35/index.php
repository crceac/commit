<?php
// Database connection
$host = 'localhost';
$dbname = 'blog_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch($_POST['action']) {
            case 'create':
                $stmt = $pdo->prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
                $stmt->execute([$_POST['title'], $_POST['content']]);
                break;
            case 'update':
                $stmt = $pdo->prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?");
                $stmt->execute([$_POST['title'], $_POST['content'], $_POST['id']]);
                break;
            case 'delete':
                $stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
                $stmt->execute([$_POST['id']]);
                break;
        }
        header('Location: index.php');
        exit;
    }
}

// Fetch all posts
$stmt = $pdo->query("SELECT * FROM posts ORDER BY id DESC");
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Admin Panel - CRUD</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 50px auto; padding: 20px; }
        .form-section { margin-bottom: 40px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
        input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; }
        .btn-create { background-color: #27ae60; color: white; }
        .btn-update { background-color: #3498db; color: white; }
        .btn-delete { background-color: #e74c3c; color: white; }
        .posts { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .post-card { background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <h1>Blog Admin Panel</h1>
    
    <div class="form-section">
        <h2>Add New Post</h2>
        <form method="POST">
            <input type="hidden" name="action" value="create">
            <input type="text" name="title" placeholder="Post Title" required>
            <textarea name="content" rows="5" placeholder="Post Content" required></textarea>
            <button type="submit" class="btn-create">Create Post</button>
        </form>
    </div>
    
    <h2>All Posts</h2>
    <div class="posts">
        <?php foreach ($posts as $post): ?>
            <div class="post-card">
                <h3><?php echo htmlspecialchars($post['title']); ?></h3>
                <p><?php echo htmlspecialchars($post['content']); ?></p>
                
                <form method="POST" style="display: inline;">
                    <input type="hidden" name="action" value="update">
                    <input type="hidden" name="id" value="<?php echo $post['id']; ?>">
                    <input type="text" name="title" value="<?php echo htmlspecialchars($post['title']); ?>" required>
                    <textarea name="content" rows="3" required><?php echo htmlspecialchars($post['content']); ?></textarea>
                    <button type="submit" class="btn-update">Update</button>
                </form>
                
                <form method="POST" style="display: inline;" onsubmit="return confirm('Delete this post?');">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="id" value="<?php echo $post['id']; ?>">
                    <button type="submit" class="btn-delete">Delete</button>
                </form>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>


