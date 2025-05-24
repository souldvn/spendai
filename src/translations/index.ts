export const translations = {
  en: {
    common: {
      loading: 'Loading...',
      edit: 'Edit',
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      cancel: 'Cancel',
      noTransactions: 'No transactions yet',
      openFromTelegram: 'Please open this app from Telegram',
      goToError: 'Go to Error Page',
      next: 'Next'
    },
    navigation: {
      home: 'Home',
      analytics: 'Analytics',
      history: 'History',
      settings: 'Settings'
    },
    home: {
      myFinance: 'SmartSpend',
      totalBalance: 'Total Balance',
      addTransaction: 'Add Transaction',
      recentTransactions: 'Recent Transactions',
      expenses: 'Expenses',
      income: 'Income',
      pieChart: 'Pie',
      barChart: 'Bar'
    },
    analytics: {
      title: 'Financial Analytics',
      financialHealth: 'Financial Health',
      totalTransactions: 'Total Transactions',
      lastUpdated: 'Last Updated',
      noTransactions: 'No transactions available for analysis',
      topCategories: 'Top Categories',
      financialOverview: 'Financial Overview',
      transactionSummary: 'Transaction Summary',
      healthStatus: {
        excellent: 'Excellent financial health',
        good: 'Good financial health',
        warning: 'Requires attention',
        critical: 'Critical condition'
      },
      healthMessages: {
        expensesExceedIncome: 'Your expenses exceed your income. Consider reducing spending.',
        excellentBuffer: 'Excellent financial health! You have a good income/expense balance and a reliable financial cushion.',
        goodBuffer: 'Good financial health. Continue building your financial cushion.',
        lowBuffer: 'Good income and expense balance. Consider increasing your financial cushion.'
      },
      analysis: {
        overview: 'Financial Overview',
        income: 'Total Income',
        expenses: 'Total Expenses',
        balance: 'Balance',
        expensesByCategory: 'Expense Analysis',
        categoryHighSpending: 'High spending detected in {category} - this is significantly above recommended levels',
        categoryModerateSpending: 'Moderate spending in {category} - consider optimizing this category',
        categoryLowSpending: 'Good spending control in {category} - keep it up!',
        balanceNegative: 'Critical Alert: Negative Balance',
        balanceLow: 'Warning: Low Balance',
        balanceGood: 'Excellent: Healthy Balance',
        recommendations: 'Detailed Category Analysis',
        noIncome: 'I notice you haven\'t recorded any income yet. Let\'s start tracking your earnings!',
        negativeSavings: 'Your expenses exceed your income. This is a critical situation that needs immediate attention.',
        lowSavings: 'Your savings rate is below the recommended 20%. Let\'s work on improving this!',
        goodSavings: 'Great job! You\'re maintaining a healthy savings rate.',
        highCategorySpending: '⚠️ Warning: Excessive spending in {category} category',
        balanceNegativeAdvice: '• Create an emergency budget\n• Look for ways to increase income\n• Prioritize essential expenses',
        balanceLowAdvice: '• Build an emergency fund\n• Review non-essential expenses\n• Consider additional income sources',
        balanceGoodAdvice: '• Consider investment opportunities\n• Set new financial goals\n• Maintain your good habits',
        immediateAction: '🚨 Immediate Action Required:\n• Cut non-essential expenses\n• Create a strict budget\n• Find additional income sources',
        improvementNeeded: '📈 Areas for Improvement:\n• Increase savings rate to 20%\n• Review spending categories\n• Set specific financial goals',
        keepGoing: '🌟 Keep Up the Good Work:\n• Continue tracking expenses\n• Consider long-term investments\n• Set new financial milestones'
      }
    },
    financialHealth: {
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor'
    },
    financialHealthMessages: {
      expensesExceedIncome: 'Your expenses exceed your income. Consider reducing spending or finding additional income sources.',
      highExpensesWithBuffer: 'Your expenses are high but you have a good buffer. Keep monitoring your spending.',
      balancedBudget: 'Your income and expenses are well balanced. Keep up the good work!',
      lowExpenses: 'Your expenses are low compared to your income. You\'re saving well!'
    },
    transactionModal: {
      addTransaction: 'Add Transaction',
      editTransaction: 'Edit Transaction',
      amount: 'Amount',
      category: 'Category',
      date: 'Date',
      type: 'Type',
      description: 'Description'
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      reportManagement: 'Report Management',
      reports: {
        title: 'Report Management',
        daily: 'Daily Report',
        weekly: 'Weekly Report',
        monthly: 'Monthly Report',
        optimization: 'Optimization Report',
        topCategories: 'Top Spending Categories',
        optimizationTips: 'Optimization Tips',
        tip1: 'Review your spending patterns in the top categories',
        tip2: 'Look for opportunities to reduce expenses in high-spending areas',
        tip3: 'Consider setting specific budget limits for each category',
        generate: 'Generate Report',
        lastGenerated: 'Last Generated',
        noData: 'No data available for the selected period'
      },
      languages: {
        en: 'English',
        ru: 'Russian'
      }
    },
    categories: {
      housing: 'Housing',
      transport: 'Transport',
      food: 'Food & Groceries',
      shopping: 'Shopping',
      phone: 'Phone & Internet',
      travel: 'Travel',
      health: 'Health & Wellness',
      entertainment: 'Entertainment',
      education: 'Education',
      debts: 'Debts & Loans',
      savings: 'Savings & Investments',
      other: 'Other Expenses',
      gifts: 'Gifts',
      debt: 'Debt Repayment',
      investment: 'Investment Income',
      salary: 'Salary',
      business: 'Business Income',
      refund: 'Refund'
    },
    history: {
      title: 'Transaction History',
      noTransactions: 'No transactions yet',
      filter: 'Filter',
      all: 'All',
      expenses: 'Expenses',
      income: 'Income',
      date: 'Date',
      amount: 'Amount',
      category: 'Category',
      description: 'Description',
      edit: 'Edit',
      delete: 'Delete',
      transactionType: 'Transaction type',
      period: {
        week: 'Week',
        month: 'Month',
        year: 'Year',
        other: 'Other period'
      },
      selectDateRange: 'Select date range'
    },
    weekdays: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun'
    }
  },
  ru: {
    common: {
      loading: 'Загрузка...',
      edit: 'Редактировать',
      close: 'Закрыть',
      save: 'Сохранить',
      delete: 'Удалить',
      cancel: 'Отмена',
      noTransactions: 'Транзакций пока нет',
      openFromTelegram: 'Пожалуйста, откройте приложение из Telegram',
      goToError: 'Перейти на страницу ошибки',
      next: 'Далее'
    },
    navigation: {
      home: 'Главная',
      analytics: 'Аналитика',
      history: 'История',
      settings: 'Настройки'
    },
    home: {
      myFinance: 'SmartSpend',
      totalBalance: 'Общий баланс',
      addTransaction: 'Добавить транзакцию',
      recentTransactions: 'Последние транзакции',
      expenses: 'Расходы',
      income: 'Доходы',
      pieChart: 'Круговая',
      barChart: 'Столбчатая'
    },
    analytics: {
      title: 'Финансовая аналитика',
      financialHealth: 'Финансовое здоровье',
      totalTransactions: 'Всего транзакций',
      lastUpdated: 'Последнее обновление',
      noTransactions: 'Нет доступных транзакций для анализа',
      topCategories: 'Топ категорий',
      financialOverview: 'Финансовый обзор',
      transactionSummary: 'Сводка транзакций',
      healthStatus: {
        excellent: 'Отличное финансовое состояние',
        good: 'Хорошее финансовое состояние',
        warning: 'Требует внимания',
        critical: 'Критическое состояние'
      },
      healthMessages: {
        expensesExceedIncome: 'Ваши расходы превышают доходы. Рекомендуется сократить расходы.',
        excellentBuffer: 'Отличное финансовое состояние! У вас хороший баланс доходов/расходов и надежная финансовая подушка.',
        goodBuffer: 'Хорошее финансовое состояние. Продолжайте накапливать финансовую подушку.',
        lowBuffer: 'Хороший баланс доходов и расходов. Рекомендуется увеличить финансовую подушку.'
      },
      analysis: {
        overview: 'Финансовый обзор',
        income: 'Общий доход',
        expenses: 'Общие расходы',
        balance: 'Баланс',
        expensesByCategory: 'Анализ расходов',
        categoryHighSpending: 'Обнаружены высокие расходы в категории {category} - это значительно выше рекомендуемого уровня',
        categoryModerateSpending: 'Умеренные расходы в категории {category} - рассмотрите возможность оптимизации',
        categoryLowSpending: 'Хороший контроль расходов в категории {category} - так держать!',
        balanceNegative: '⚠️ Критическое предупреждение: Отрицательный баланс',
        balanceLow: '⚠️ Внимание: Низкий баланс',
        balanceGood: '✅ Отлично: Здоровый баланс',
        recommendations: 'Детальный анализ категорий',
        noIncome: 'Я заметил, что вы еще не записали доходы. Давайте начнем отслеживать ваши заработки!',
        negativeSavings: 'Ваши расходы превышают доходы. Это критическая ситуация, требующая немедленного внимания.',
        lowSavings: 'Ваша норма сбережений ниже рекомендуемых 20%. Давайте поработаем над улучшением!',
        goodSavings: 'Отличная работа! Вы поддерживаете здоровую норму сбережений.',
        highCategorySpending: '⚠️ Внимание: Чрезмерные расходы в категории {category}',
        balanceNegativeAdvice: '• Создайте экстренный бюджет\n• Ищите способы увеличения дохода\n• Приоритезируйте основные расходы',
        balanceLowAdvice: '• Создайте резервный фонд\n• Пересмотрите необязательные расходы\n• Рассмотрите дополнительные источники дохода',
        balanceGoodAdvice: '• Рассмотрите возможности инвестирования\n• Поставьте новые финансовые цели\n• Поддерживайте хорошие привычки',
        immediateAction: '🚨 Требуются немедленные действия:\n• Сократите необязательные расходы\n• Создайте строгий бюджет\n• Найдите дополнительные источники дохода',
        improvementNeeded: '📈 Области для улучшения:\n• Увеличьте норму сбережений до 20%\n• Пересмотрите категории расходов\n• Поставьте конкретные финансовые цели',
        keepGoing: '🌟 Продолжайте в том же духе:\n• Продолжайте отслеживать расходы\n• Рассмотрите долгосрочные инвестиции\n• Поставьте новые финансовые вехи'
      }
    },
    financialHealth: {
      excellent: 'Отлично',
      good: 'Хорошо',
      fair: 'Удовлетворительно',
      poor: 'Плохо'
    },
    financialHealthMessages: {
      expensesExceedIncome: 'Ваши расходы превышают доходы. Рассмотрите возможность сокращения расходов или поиска дополнительных источников дохода.',
      highExpensesWithBuffer: 'Ваши расходы высокие, но у вас есть хороший запас. Продолжайте следить за расходами.',
      balancedBudget: 'Ваши доходы и расходы хорошо сбалансированы. Продолжайте в том же духе!',
      lowExpenses: 'Ваши расходы низкие по сравнению с доходами. Вы хорошо откладываете!'
    },
    transactionModal: {
      addTransaction: 'Добавить транзакцию',
      editTransaction: 'Редактировать транзакцию',
      amount: 'Сумма',
      category: 'Категория',
      date: 'Дата',
      type: 'Тип',
      description: 'Описание'
    },
    settings: {
      title: 'Настройки',
      language: 'Язык',
      theme: 'Тема',
      light: 'Светлая',
      dark: 'Темная',
      reportManagement: 'Управление отчетами',
      reports: {
        title: 'Управление отчетами',
        daily: 'Ежедневный отчет',
        weekly: 'Еженедельный отчет',
        monthly: 'Ежемесячный отчет',
        optimization: 'Отчет по оптимизации',
        topCategories: 'Основные категории расходов',
        optimizationTips: 'Советы по оптимизации',
        tip1: 'Проанализируйте свои расходы в основных категориях',
        tip2: 'Ищите возможности сократить расходы в категориях с высокими тратами',
        tip3: 'Рассмотрите возможность установки лимитов бюджета для каждой категории',
        generate: 'Сформировать отчет',
        lastGenerated: 'Последнее формирование',
        noData: 'Нет данных за выбранный период'
      },
      languages: {
        en: 'Английский',
        ru: 'Русский'
      }
    },
    categories: {
      housing: 'Жилье',
      transport: 'Транспорт',
      food: 'Продукты',
      shopping: 'Покупки',
      phone: 'Телефон и интернет',
      travel: 'Путешествия',
      health: 'Здоровье',
      entertainment: 'Развлечения',
      education: 'Образование',
      debts: 'Долги и кредиты',
      savings: 'Сбережения и инвестиции',
      other: 'Другие расходы',
      gifts: 'Подарки',
      refund: 'Возврат долга',
      investment: 'Доход от инвестиций',
      salary: 'Зарплата',
      business: 'Доход от бизнеса'
    },
    history: {
      title: 'История транзакций',
      noTransactions: 'Транзакций пока нет',
      filter: 'Фильтр',
      all: 'Все',
      expenses: 'Расходы',
      income: 'Доходы',
      date: 'Дата',
      amount: 'Сумма',
      category: 'Категория',
      description: 'Описание',
      edit: 'Редактировать',
      delete: 'Удалить',
      transactionType: 'Тип транзакции',
      period: {
        week: 'Неделя',
        month: 'Месяц',
        year: 'Год',
        other: 'Другой период'
      },
      selectDateRange: 'Выберите период'
    },
    weekdays: {
      mon: 'Пн',
      tue: 'Вт',
      wed: 'Ср',
      thu: 'Чт',
      fri: 'Пт',
      sat: 'Сб',
      sun: 'Вс'
    }
  }
}; 