import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import { getUserSettings } from './firebaseConfig';

export async function getTranslator(userId: string) {
  const settings = await getUserSettings(userId);
  const currencySymbol = settings?.currencySymbol || '$';
  const currencyRate = settings?.currencyRate || 1;  // 1 если в долларах, иначе ставим курс

  return { currencyRate, currencySymbol };
}



