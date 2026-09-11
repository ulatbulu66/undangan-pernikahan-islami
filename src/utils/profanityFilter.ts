/**
 * Comprehensive content safety, insults/slurs filter, name validator, and leetspeak detector.
 * Filters vulgarities, insults, demeaning words (miskin, gaje, norak, etc.), sarcasm, slurs, and bot spam.
 */

// Comprehensive dictionary of offensive, vulgar, and demeaning/insulting terms
const offensiveWords: string[] = [
  // 1. Demeaning, Insulting, Belittling terms (Penghinaan & Cemoohan)
  "miskin", "m1sk1n", "kere", "melarat", "gembel", "pengemis", "babu", "jongos", "hina", "rendahan",
  "gaje", "g4j3", "gajelas", "g4j3l4s", "gak jelas", "nggak jelas", "kampung", "kampungan", "udik", "norak", "cupu",
  "culun", "alay", "lebay", "pansos", "sok suci", "sok alim", "sokalim", "soksuci", "munafik", "halu", "toxic",
  "bocah", "bau kencur", "beban", "parasit", "gagal", "pecundang", "loser", "ugly", "poor", "trash", "cringe",
  "sampah", "monyet", "babon", "anjing", "babi", "kambing", "anjing lu", "jelek", "buruk rupa", "burukrupa",
  "pesek", "gendut", "kerempeng", "cacat", "dungu", "tolol", "bego", "goblok", "idiot", "moron", "autis",
  "gila", "sinting", "sarap", "sakit jiwa", "stress", "stres",

  // 2. Sarcastic Wedding / Age / Status Attacks
  "perawan tua", "perawantua", "perawan", "per4w4n", "bujang lapuk", "bujanglapuk", "janda gatal", "janda kembang",
  "hamil duluan", "dp duluan", "tekdung", "tua bangka", "bau tanah", "gak laku", "ga laku", "nggak laku",
  "kok mau", "terpaksa nikah", "kawin lari", "cabul", "zina", "pelakor", "pebinor", "pejantan",

  // 3. Vulgar & Slurs (Indonesian Umum & Daerah)
  "anj", "anjir", "anjay", "anying", "bangsat", "kontol", "kntl", "memek", "mmk", "jembut", "jmbt",
  "tai", "taik", "pantek", "puki", "pukimak", "ngentot", "ngentod", "entot", "pepek", "peli", "itil", "tetek", "toket",
  "kampret", "bajingan", "lonte", "pelacur", "perek", "pecun", "sange", "sangean", "coli", "coly", "masturbasi",
  "bencong", "banci", "homo", "lesbi", "kafir", "dajal", "biadab", "keparat", "mampus", "modar", "bejat", "setan",
  "iblis", "sialan", "brengsek", "najis",
  "jancok", "dancok", "cok", "jancuk", "asu", "matamu", "raimu", "ndasmu", "gathel", "tempik", "kirek",
  "bagong", "kebo", "sia", "belegug", "goblog", "kunyuk", "bodat", "sundala", "telaso", "laso",

  // 4. English & International Insults / Profanity
  "fuck", "fucking", "fucker", "fck", "shit", "bullshit", "bitch", "btch", "ass", "asshole", "bastard",
  "cunt", "dick", "cock", "pussy", "whore", "slut", "motherfucker", "faggot", "fag", "nigger", "nigga",
  "retard", "dipshit", "douche", "douchebag", "wanker", "prick", "twat", "blowjob", "tits", "boobs",
  "porn", "porno", "anal", "vagina", "penis", "virgin",
  "puta", "puto", "mierda", "cabron", "hijo de puta", "chinga", "cul", "merde", "putain", "salope",
  "scheisse", "arschloch", "kurwa", "blyat", "cyka", "gago", "tangina", "tanginamo", "putangina",
  "cibai", "lanjiao", "sohai", "pokai"
];

// Complex multi-word regex patterns
const offensivePatterns: RegExp[] = [
  /per[a4]w[a4]n\s*tu[a4]/i,
  /buj[a4]ng\s*l[a4]puk/i,
  /h[a4]m[i1]l\s*dulu[a4]n/i,
  /k[a4]w[i1]n\s*l[a4]r[i1]/i,
  /tu[a4]\s*b[a4]ngk[a4]/i,
  /b[a4]u\s*t[a4]n[a4]h/i,
  /g[a4]k\s*l[a4]ku/i,
  /ga\s*l[a4]ku/i,
  /m[a4]s[i1]h\s*(s[i1]h)?\s*per[a4]w[a4]n/i,
  /g[a4]je\s*(b[a4]ng[e3]t)?/i,
  /m[i1]sk[i1]n\s*(b[a4]ng[e3]t)?/i,
  /s[o0]k\s*s[u0]c[i1]/i,
  /s[o0]k\s*[a4]l[i1]m/i,
  /k[a4]mp[u0]ng[a4]n/i,
];

/**
 * Normalizes text to detect obfuscated words / leetspeak.
 */
export function normalizeLeet(str: string): string {
  return str
    .toLowerCase()
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/8/g, 'b')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/!/g, 'i')
    .replace(/[\_\-\.\,\*\+\#\~\^\(\)\'\"\?\<\>\/\\\|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if text contains any offensive words, insulting expressions, or swearing.
 */
export function isOffensive(text: string): boolean {
  if (!text || !text.trim()) return false;

  const rawLower = text.toLowerCase();
  const normalized = normalizeLeet(text);
  const condensed = normalized.replace(/\s+/g, '');
  const deDuplicated = normalized.replace(/(.)\1+/g, '$1');
  const deDuplicatedCondensed = condensed.replace(/(.)\1+/g, '$1');

  // 1. Check multi-word offensive patterns
  for (const pattern of offensivePatterns) {
    if (pattern.test(rawLower) || pattern.test(normalized)) {
      return true;
    }
  }

  // 2. Check each word in dictionary
  for (const word of offensiveWords) {
    const wordNorm = word.toLowerCase();
    const wordCondensed = wordNorm.replace(/\s+/g, '');

    // Exact word boundary regex
    const regex = new RegExp(`\\b${wordNorm}\\b`, 'i');
    if (regex.test(rawLower) || regex.test(normalized)) {
      return true;
    }

    // Condensed match for words >= 3 letters
    if (wordCondensed.length >= 3) {
      if (condensed.includes(wordCondensed) || deDuplicatedCondensed.includes(wordCondensed)) {
        return true;
      }
    }

    // Deduplicated match for words >= 3 letters
    const minWord = wordNorm.replace(/(.)\1+/g, '$1');
    if (minWord.length >= 3 && (deDuplicated.includes(minWord) || deDuplicatedCondensed.includes(minWord))) {
      return true;
    }
  }

  return false;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates whether the guest name is a plausible human / family / honorific name.
 */
export function validateGuestName(name: string): ValidationResult {
  const trimmed = name.trim();

  // 1. Length check
  if (trimmed.length < 2) {
    return { isValid: false, errorMessage: 'Nama terlalu pendek (minimal 2 huruf).' };
  }
  if (trimmed.length > 50) {
    return { isValid: false, errorMessage: 'Nama maksimal 50 karakter.' };
  }

  // 2. Reject numbers
  if (/\d/.test(trimmed)) {
    return { isValid: false, errorMessage: 'Nama tidak boleh mengandung angka. Mohon gunakan nama asli atau nama keluarga.' };
  }

  // 3. Reject URL / bot / internet handles / symbol spam
  if (/(\.com|\.org|\.net|\.id|\.io|\.xyz|http|www|@|#|\$|%|\^|\*|_|\+|=|~|<|>|\\|\/|\[|\]|\{|\})/i.test(trimmed)) {
    return { isValid: false, errorMessage: 'Nama mengandung simbol atau format tidak wajar.' };
  }

  // 4. Character whitelist
  const validNamePattern = /^[A-Za-zÀ-ÿ\s\.\,\'\-\&\(\)]+$/;
  if (!validNamePattern.test(trimmed)) {
    return { isValid: false, errorMessage: 'Nama hanya boleh terdiri dari huruf, spasi, dan tanda baca gelar standar.' };
  }

  // 5. Anti-gibberish
  const words = trimmed.split(/[\s\.\,\'\-\&\(\)]+/).filter(w => w.length > 0);
  for (const w of words) {
    if (w.length >= 3 && !/[aeiouyAEIOUY]/.test(w)) {
      return { isValid: false, errorMessage: 'Format nama tidak wajar (mohon masukkan nama yang valid).' };
    }
    if (/(.)\1{3,}/.test(w)) {
      return { isValid: false, errorMessage: 'Nama mengandung pengulangan huruf yang berlebihan.' };
    }
  }

  // 6. Suspicious bot / fake name keywords
  const lowerName = trimmed.toLowerCase();
  const suspiciousKeywords = ['admin', 'anonymous', 'anonim', 'hacker', 'bot', 'testing', 'tester', 'system', 'ulatbulu'];
  for (const keyword of suspiciousKeywords) {
    if (lowerName === keyword || lowerName.includes(keyword)) {
      return { isValid: false, errorMessage: 'Mohon gunakan nama asli Anda atau nama perwakilan keluarga/instansi.' };
    }
  }

  // 7. Profanity / insults check
  if (isOffensive(trimmed)) {
    return { isValid: false, errorMessage: 'Nama mengandung kata yang tidak pantas.' };
  }

  return { isValid: true };
}

/**
 * Validates the wedding guest message / prayer.
 */
export function validateGuestMessage(message: string): ValidationResult {
  const trimmed = message.trim();

  if (trimmed.length < 3) {
    return { isValid: false, errorMessage: 'Pesan ucapan terlalu singkat.' };
  }
  if (trimmed.length > 500) {
    return { isValid: false, errorMessage: 'Pesan ucapan maksimal 500 karakter.' };
  }

  // Check offensive / insult content
  if (isOffensive(trimmed)) {
    return {
      isValid: false,
      errorMessage: 'Pesan ditolak karena mengandung kata penghinaan atau tidak pantas (seperti kata merendahkan, sindiran, atau kata kasar). Mohon sampaikan doa yang santun.'
    };
  }

  // Anti-spam gibberish check on message
  if (/(.)\1{7,}/.test(trimmed)) {
    return { isValid: false, errorMessage: 'Pesan mengandung karakter berulang yang tidak wajar.' };
  }

  return { isValid: true };
}
