import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnkvvtqtgpoxoqrtuyuc.supabase.co';
const supabaseAnonKey = 'sb_publishable_7SpvzSp3lyjbIk9-yy8Vnw_8jEhSdEp';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);