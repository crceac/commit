function toggleAnswer(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.answer');
    const icon = element.querySelector('.icon');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.answer').style.display = 'none';
            item.querySelector('.icon').textContent = '+';
            item.querySelector('.question').classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.textContent = '+';
        element.classList.remove('active');
    } else {
        answer.style.display = 'block';
        icon.textContent = '−';
        element.classList.add('active');
    }
}


