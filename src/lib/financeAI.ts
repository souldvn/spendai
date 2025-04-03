type TFunction = (key: string, params?: Record<string, string>) => string;

interface FinancialAnalysis {
  totalIncome: number;
  totalExpenses: number;
  expensesByCategory: { category: string; amount: number }[];
  currentBalance: number;
  t: TFunction;
}

function getRecommendationsByCategory(category: string, amount: number, totalExpenses: number, t: TFunction): string | null {
  const percentage = (amount / totalExpenses) * 100;
  const categoryName = t(`categories.${category}`);
  
  if (percentage > 50) {
    return `• ⚠️ ${t('analytics.analysis.categoryHighSpending', { category: categoryName })}`;
  } else if (percentage > 30) {
    return `• 💡 ${t('analytics.analysis.categoryModerateSpending', { category: categoryName })}`;
  }
  
  return null;
}

export function analyzeFinances(data: FinancialAnalysis): string {
  const { totalIncome, totalExpenses, expensesByCategory, currentBalance, t } = data;
  
  let analysis = `${t('analytics.analysis.overview')}:\n\n`;
  
  // Basic overview
  analysis += `${t('analytics.analysis.income')}: $${totalIncome.toLocaleString()}\n`;
  analysis += `${t('analytics.analysis.expenses')}: $${totalExpenses.toLocaleString()}\n`;
  analysis += `${currentBalance >= 0 ? '✅' : '⚠️'} ${t('analytics.analysis.balance')}: $${currentBalance.toLocaleString()}\n\n`;
  
  // Expenses by category
  analysis += `${t('analytics.analysis.expensesByCategory')}:\n`;
  expensesByCategory
    .sort((a, b) => b.amount - a.amount)
    .forEach(({ category, amount }) => {
      const percentage = (amount / totalExpenses * 100).toFixed(1);
      analysis += `${t(`categories.${category}`)}: $${amount.toLocaleString()} (${percentage}%)\n`;
    });
  
  // Recommendations
  analysis += `\n${t('analytics.analysis.recommendations')}:\n`;
  
  // Balance recommendations
  if (currentBalance < 0) {
    analysis += `• ⚠️ ${t('analytics.analysis.balanceNegative')}\n`;
  } else if (currentBalance < totalIncome * 0.2) {
    analysis += `• ⚠️ ${t('analytics.analysis.balanceLow')}\n`;
  } else if (currentBalance > totalIncome * 0.5) {
    analysis += `• 💰 ${t('analytics.analysis.balanceGood')}\n`;
  }

  // Category-specific recommendations
  expensesByCategory.forEach(({ category, amount }) => {
    const recommendation = getRecommendationsByCategory(category, amount, totalExpenses, t);
    if (recommendation) {
      analysis += recommendation + "\n";
    }
  });

  // General recommendations
  if (totalExpenses > 0) {
    analysis += `\n🎯 ${t('analytics.analysis.generalRecommendations')}:\n`;
    analysis += `• ${t('analytics.analysis.createBudget')}\n`;
    analysis += `• ${t('analytics.analysis.savePercentage')}\n`;
    analysis += `• ${t('analytics.analysis.trackExpenses')}\n`;
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