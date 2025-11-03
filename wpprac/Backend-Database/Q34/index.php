<?php
// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['comment'])) {
    $comment = trim($_POST['comment']);
    if (!empty($comment)) {
        // Append comment to file (in production, use database)
        file_put_contents('comments.txt', date('Y-m-d H:i:s') . ' - ' . htmlspecialchars($comment) . PHP_EOL, FILE_APPEND | LOCK_EX);
    }
}

// Read all comments
$comments = [];
if (file_exists('comments.txt')) {
    $comments = array_filter(file('comments.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));
    $comments = array_reverse($comments); // Show newest first
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
        }
        form {
            margin-bottom: 40px;
        }
        textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
        }
        button {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .comments {
            border-top: 2px solid #ecf0f1;
            padding-top: 20px;
        }
        .comment-item {
            background-color: #f8f9fa;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Feedback Form</h1>
    
    <form method="POST" action="">
        <textarea name="comment" rows="4" placeholder="Enter your feedback..." required></textarea><br>
        <button type="submit">Submit Feedback</button>
    </form>
    
    <div class="comments">
        <h2>Submitted Comments</h2>
        <?php if (empty($comments)): ?>
            <p>No comments yet. Be the first to leave feedback!</p>
        <?php else: ?>
            <?php foreach ($comments as $comment): ?>
                <div class="comment-item">
                    <?php echo htmlspecialchars($comment); ?>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</body>
</html>


