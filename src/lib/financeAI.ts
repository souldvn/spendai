interface FinancialAnalysis {
  totalIncome: number;
  totalExpenses: number;
  expensesByCategory: Record<string, number>;
  currentBalance: number;
}

function getRecommendationsByCategory(category: string, amount: number, totalExpenses: number): string {
  const percentage = (amount / totalExpenses) * 100;
  
  const recommendations: Record<string, string[]> = {
    'Housing': [
      '• Рассмотрите возможность поиска соседа по квартире для разделения расходов',
      '• Сравните цены на другие варианты жилья в вашем районе',
      '• Оптимизируйте расходы на коммунальные услуги'
    ],
    'Transport': [
      '• Рассмотрите использование общественного транспорта',
      '• Попробуйте carpooling или совместные поездки',
      '• Оптимизируйте маршруты для экономии топлива'
    ],
    'Food & Groceries': [
      '• Планируйте меню на неделю заранее',
      '• Покупайте продукты по акциям и со скидками',
      '• Готовьте еду дома вместо заказов'
    ],
    'Entertainment': [
      '• Ищите бесплатные развлечения и мероприятия',
      '• Используйте групповые скидки и акции',
      '• Рассмотрите подписки вместо разовых покупок'
    ],
    'Shopping': [
      '• Составляйте список покупок и придерживайтесь его',
      '• Дождитесь сезонных распродаж',
      '• Сравнивайте цены в разных магазинах'
    ],
    'Health & Wellness': [
      '• Проверьте программы страхования',
      '• Занимайтесь спортом дома или на улице',
      '• Ищите скидки на медицинские услуги'
    ]
  };

  if (percentage > 30) {
    return `⚠️ Расходы на ${category} составляют ${percentage.toFixed(1)}% от общих расходов.\n${
      recommendations[category]?.join('\n') || '• Рассмотрите способы оптимизации этой категории расходов'
    }`;
  }
  
  return '';
}

export function analyzeFinances(data: FinancialAnalysis): string {
  const { totalIncome, totalExpenses, expensesByCategory, currentBalance } = data;
  
  let analysis = "📊 Анализ ваших финансов:\n\n";
  
  // Basic overview
  analysis += `💰 Общий доход: $${totalIncome.toLocaleString()}\n`;
  analysis += `💸 Общие расходы: $${totalExpenses.toLocaleString()}\n`;
  analysis += `${currentBalance >= 0 ? '✅' : '⚠️'} Баланс: $${currentBalance.toLocaleString()}\n\n`;
  
  // Expenses by category
  analysis += "📈 Расходы по категориям:\n";
  Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .forEach(([category, amount]) => {
      const percentage = (amount / totalExpenses * 100).toFixed(1);
      analysis += `${category}: $${amount.toLocaleString()} (${percentage}%)\n`;
    });
  
  // Recommendations
  analysis += "\n💡 Рекомендации:\n";
  
  // Balance recommendations
  if (currentBalance < 0) {
    analysis += "• ⚠️ Ваши расходы превышают доходы. Необходимо сократить расходы или увеличить доход.\n";
  } else if (currentBalance < totalIncome * 0.2) {
    analysis += "• ⚠️ У вас небольшой запас средств. Постарайтесь увеличить сбережения.\n";
  } else if (currentBalance > totalIncome * 0.5) {
    analysis += "• 💰 У вас хороший запас средств. Рассмотрите возможности инвестирования.\n";
  }

  // Category-specific recommendations
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    const recommendation = getRecommendationsByCategory(category, amount, totalExpenses);
    if (recommendation) {
      analysis += recommendation + "\n";
    }
  });

  // General recommendations
  if (totalExpenses > 0) {
    analysis += "\n🎯 Общие рекомендации:\n";
    analysis += "• Создайте бюджет на месяц и следите за его выполнением\n";
    analysis += "• Откладывайте минимум 20% дохода на сбережения\n";
    analysis += "• Ведите учет всех расходов для лучшего контроля\n";
  }

  return analysis;
}

const commonResponses: Record<string, string> = {
  'привет': '👋 Привет! Рад видеть вас! Я ваш персональный финансовый ассистент. Как я могу помочь вам сегодня?',
  'как сэкономить': '💡 Вот несколько эффективных способов экономии:\n\n• 📝 Ведите учет расходов\n• 🛒 Планируйте покупки заранее\n• 🔍 Ищите скидки и акции\n• 💰 Сравнивайте цены\n• 🏦 Откладывайте часть дохода\n\nХотите, я помогу вам составить план экономии?',
  'инвестиции': '📈 Для начала инвестирования важно:\n\n• 💰 Создать финансовую подушку\n• 📚 Изучить разные инструменты\n• ⚠️ Не рисковать всеми деньгами\n• 🔄 Диверсифицировать вложения\n\nДавайте обсудим, какие инвестиционные стратегии подойдут именно вам?',
  'бюджет': '📊 Основные принципы планирования бюджета:\n\n• 🏠 50% на необходимые расходы\n• 🎮 30% на желания и развлечения\n• 💰 20% на сбережения и инвестиции\n\nХотите, я помогу вам составить персональный бюджет?',
};

export function getAIResponse(message: string, context: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for common questions
  for (const [key, response] of Object.entries(commonResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  // Parse context for personalized response
  const contextData = context.split('\n').reduce((acc, line) => {
    const [key, value] = line.split(': $');
    if (value) {
      acc[key] = parseFloat(value.replace(/,/g, ''));
    }
    return acc;
  }, {} as Record<string, number>);

  // Personalized responses based on context
  if (lowerMessage.includes('долг') || lowerMessage.includes('долги')) {
    const balance = contextData['Current Balance'] || 0;
    return balance < 0 
      ? '⚠️ Для уменьшения долга рекомендую:\n\n• 📝 Составить план погашения\n• 💰 Сократить необязательные расходы\n• 💼 Искать дополнительные источники дохода\n\nХотите, я помогу составить план погашения долга?'
      : '✅ Отлично! У вас нет долгов - это прекрасное финансовое положение! Продолжайте поддерживать положительный баланс.';
  }

  if (lowerMessage.includes('сбережения') || lowerMessage.includes('накопления')) {
    const income = contextData['Total Income'] || 0;
    const recommendedSavings = Math.round(income * 0.2);
    return `💰 Для накоплений рекомендую откладывать $${recommendedSavings} в месяц (20% от дохода).\n\nЭто поможет создать финансовую подушку безопасности.\n\nХотите, я помогу составить план накоплений?`;
  }

  if (lowerMessage.includes('анализ') || lowerMessage.includes('анализировать')) {
    return '📊 Давайте проанализируем ваши финансы! Нажмите кнопку "Запросить анализ" выше, и я предоставлю подробный разбор вашей финансовой ситуации с рекомендациями.';
  }

  // Default response
  return '🤔 Я могу помочь вам с анализом финансов и дать рекомендации по управлению бюджетом. Задайте конкретный вопрос или воспользуйтесь кнопкой "Запросить анализ" для подробного разбора.\n\nЧто именно вас интересует?';
} 