'use client';

import { useEffect, useId, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Banknote, Check, CircleX, Hash, Landmark, Loader2, CalendarDays, CreditCard, Lock, Tag, TriangleAlert, Coins } from 'lucide-react';
import { submitLoanRequest } from '@/lib/actions/loan';
import { SIMULATION } from '@/lib/config';
import { CURRENCIES, OTHER_PURPOSE } from '@/lib/constants/statuses';
import { useI18n } from '@/lib/i18n/provider';
import { purposeLabel } from '@/lib/i18n/shared';
import { progressAt } from '@/lib/simulation/progress';
import { formatCode, formatDigitGroups, formatMoney } from '@/lib/utils';
import { LOAN_STEP_FIELDS, isValidExpiry, validateLoanStep, type LoanFormValues } from '@/lib/validations/loan';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import type { Bank, CardType, Purpose } from '@/types/db';
import { BankPicker } from './BankPicker';
import { CardPicker } from './CardPicker';

interface Props {
  banks: Bank[];
  purposes: Purpose[];
  cardTypes: CardType[];
}

const STEPS = 3; // 1 informations + motif + banque · 2 carte + vérification · 3 récapitulatif
const VERIFY_MS = 8000;

export function LoanWizard({ banks, purposes, cardTypes }: Props) {
  const { t, locale } = useI18n();
  const initial: LoanFormValues = {
    amount: '', currency: 'EUR', purposeCode: '', purposeDetails: '',
    bankId: '', otherBankName: '',
    demoNumber: '', demoFruit: '', demoAnimal: '', // vérification complémentaire : toujours vide au départ
    cardTypeId: '', otherCardName: '',
    demoColor: '', demoDigit: '', demoYear: '', // vérification pédagogique : toujours vide au départ (distincte du profil)
  };
  const [step, setStep] = useState(0);
  const [verifiedFor, setVerifiedFor] = useState(''); // date « MM/AA » pour laquelle la barre de vérification est déjà allée au bout
  const [values, setValues] = useState<LoanFormValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [phase, setPhase] = useState<'form' | 'processing' | 'result'>('form');
  const [loanId, setLoanId] = useState('');
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (step > 0 || phase !== 'form') headingRef.current?.focus();
  }, [step, phase]);

  const update = (partial: Partial<LoanFormValues>) => {
    setValues((v) => ({ ...v, ...partial }));
    setErrors((e) => {
      const rest = { ...e };
      for (const k of Object.keys(partial)) delete rest[k];
      return rest;
    });
  };
  const translate = (keys: Record<string, string>) => Object.fromEntries(Object.entries(keys).map(([k, v]) => [k, t(v)]));

  const goNext = () => {
    const found = validateLoanStep(step, values);
    if (Object.keys(found).length) return setErrors(translate(found));
    setErrors({});
    if (step === 1) setVerifiedFor(values.demoYear);
    setStep((s) => s + 1);
  };

  const submit = () => {
    for (let i = 0; i < STEPS - 1; i++) {
      const found = validateLoanStep(i, values);
      if (Object.keys(found).length) {
        setStep(i);
        return setErrors(translate(found));
      }
    }
    setServerError('');
    startTransition(async () => {
      const res = await submitLoanRequest(values); // la validation est refaite côté serveur, puis par la base
      if (res.ok) {
        setLoanId(res.id);
        return setPhase('processing');
      }
      setServerError(res.message);
      const fe = res.fieldErrors;
      if (fe) {
        setErrors(fe);
        const idx = LOAN_STEP_FIELDS.findIndex((fields) => fields.some((f) => f in fe));
        if (idx >= 0) setStep(idx);
      }
    });
  };

  if (phase === 'processing') return <Processing onDone={() => setPhase('result')} />;
  if (phase === 'result') {
    return (
      <div className="card mx-auto max-w-xl space-y-4 py-10 text-center" role="status">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-hibiscus-500/10 text-hibiscus-600 ring-8 ring-hibiscus-500/5"><CircleX className="h-10 w-10" aria-hidden /></span>
        <h2 ref={headingRef} tabIndex={-1} className="text-3xl text-navy-900 focus:outline-none">{t('proc.rejected.title')}</h2>
        <p className="text-navy-700">{t('proc.rejected.text')}</p>
        <p className="mx-auto max-w-md rounded-xl bg-sun-300/25 px-4 py-2.5 text-sm font-semibold text-[#7a5600]">{t('proc.rejected.notReal')}</p>
        <p className="text-sm font-semibold text-lagoon-700">{t('proc.saved')}</p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href={`/dashboard/requests/${loanId}`} className="btn btn-primary">{t('proc.detail')}</Link>
          <Link href="/dashboard" className="btn btn-outline">{t('nav.dashboard')}</Link>
        </div>
      </div>
    );
  }

  const purpose = purposes.find((p) => p.code === values.purposeCode);
  const bank = banks.find((b) => b.id === values.bankId);
  const card = cardTypes.find((c) => c.id === values.cardTypeId);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < STEPS - 1) goNext();
        else submit();
      }}
      className="space-y-5"
    >
      <ol className="flex items-center" aria-label={t('apply.title')}>
        {Array.from({ length: STEPS }, (_, i) => (
          <li key={i} aria-current={i === step ? 'step' : undefined} className={`flex items-center ${i < STEPS - 1 ? 'flex-1' : ''}`}>
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition duration-300 ${i < step ? 'bg-lagoon-500 text-white' : i === step ? 'bg-navy-900 text-white ring-4 ring-lagoon-200' : 'border border-navy-200 bg-white text-navy-400'}`}>
              {i < step ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
              <span className="sr-only"> {t(`apply.s${i + 1}`)}</span>
            </span>
            {i < STEPS - 1 && <span aria-hidden className={`mx-1.5 h-0.5 flex-1 rounded-full transition-colors duration-500 ${i < step ? 'bg-lagoon-500' : 'bg-navy-100'}`} />}
          </li>
        ))}
      </ol>

      <div className="card space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl focus:outline-none">{t(`apply.t${step + 1}`)}</h2>
          <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-600">{t('apply.stepOf', { current: step + 1, total: STEPS })}</span>
        </div>

        {serverError && <p role="alert" className="rounded-xl border border-hibiscus-500/30 bg-hibiscus-500/10 p-3.5 text-sm font-medium text-hibiscus-600">{serverError}</p>}

        {step === 0 && (
          <>
            <Section first title={t('apply.sec.info')}>
              <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                <TextField name="amount" type="number" inputMode="decimal" step="0.01" min={0} label={t('apply.amount')} required value={values.amount} onChange={(e) => update({ amount: e.target.value })} error={errors.amount} />
                <SelectField label={t('apply.currency')} value={values.currency} onChange={(e) => update({ currency: e.target.value })} error={errors.currency}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </SelectField>
              </div>
            </Section>

            <Section title={t('apply.sec.purpose')}>
              <SelectField
                label={t('apply.purpose')}
                required
                value={values.purposeCode}
                onChange={(e) => update({ purposeCode: e.target.value, ...(e.target.value === OTHER_PURPOSE ? {} : { purposeDetails: '' }) })}
                error={errors.purposeCode}
              >
                <option value="" disabled>{t('apply.purpose.ph')}</option>
                {purposes.map((p) => <option key={p.code} value={p.code}>{purposeLabel(p, locale)}</option>)}
              </SelectField>
              {values.purposeCode === OTHER_PURPOSE && (
                <TextField label={t('apply.purposeOther')} required maxLength={300} value={values.purposeDetails} onChange={(e) => update({ purposeDetails: e.target.value })} error={errors.purposeDetails} />
              )}
            </Section>

            <Section title={t('apply.sec.bank')}>
              <BankPicker
                banks={banks}
                value={values.bankId}
                onChange={(bankId) => update({ bankId, ...(bankId === 'other' ? {} : { otherBankName: '' }) })}
                otherName={values.otherBankName}
                onOtherName={(otherBankName) => update({ otherBankName })}
                error={errors.bankId}
                otherError={errors.otherBankName}
              />
              <TextField label={t('apply.demo.number')} icon={Hash} required autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder={t('ph.numberLong')} hint={t('apply.demo.numberHint')} value={values.demoNumber} onChange={(e) => update({ demoNumber: formatCode(e.target.value) })} error={errors.demoNumber} />
              <TextField label={t('apply.demo.fruit')} required maxLength={30} autoComplete="off" placeholder={t('ph.fruit')} value={values.demoFruit} onChange={(e) => update({ demoFruit: e.target.value })} error={errors.demoFruit} />
              <TextField label={t('apply.demo.animal')} required maxLength={30} autoComplete="off" placeholder={t('ph.animal')} value={values.demoAnimal} onChange={(e) => update({ demoAnimal: e.target.value })} error={errors.demoAnimal} />
            </Section>
          </>
        )}

        {step === 1 && (
          <>
            <Section first title={t('apply.sec.card')}>
              <CardPicker
                cardTypes={cardTypes}
                value={values.cardTypeId}
                onChange={(cardTypeId) => update({ cardTypeId, ...(cardTypeId === 'other' ? {} : { otherCardName: '' }) })}
                otherName={values.otherCardName}
                onOtherName={(otherCardName) => update({ otherCardName })}
                error={errors.cardTypeId}
                otherError={errors.otherCardName}
              />
            </Section>

            <Section title={t('apply.sec.verif')}>
              <VerificationStep values={values} errors={errors} update={update} verifiedFor={verifiedFor} onComplete={goNext} />
            </Section>
          </>
        )}

        {step === 2 && (
          <dl className="divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 text-sm">
            {[
              [Banknote, t('apply.amount'), formatMoney(Number(values.amount), values.currency, locale)],
              [Coins, t('apply.currency'), values.currency],
              [Tag, t('apply.purpose'), `${purpose ? purposeLabel(purpose, locale) : ''}${values.purposeCode === OTHER_PURPOSE ? ` — ${values.purposeDetails}` : ''}`],
              [Landmark, t('req.bank'), bank ? bank.name : t('req.customBank', { name: values.otherBankName })],
              [Hash, t('apply.demo.number'), values.demoNumber],
              [Tag, t('apply.demo.fruit'), values.demoFruit],
              [Tag, t('apply.demo.animal'), values.demoAnimal],
              [CreditCard, t('apply.card'), card ? card.name : values.cardTypeId === 'other' ? values.otherCardName : '—'],
              [CreditCard, t('apply.demo.color'), values.demoColor],
              [Lock, t('apply.demo.digit'), values.demoDigit],
              [CalendarDays, t('apply.demo.year'), values.demoYear],
            ].map(([Icon, label, value]) => {
              const I = Icon as typeof Banknote;
              return (
                <div key={label as string} className="flex items-start gap-3 px-4 py-3.5 odd:bg-navy-50/40">
                  <I className="mt-0.5 h-5 w-5 shrink-0 text-lagoon-600" aria-hidden />
                  <dt className="w-36 shrink-0 text-navy-500 sm:w-44">{label as string}</dt>
                  <dd className="min-w-0 whitespace-pre-wrap break-words font-semibold text-navy-900">{value as string}</dd>
                </div>
              );
            })}
          </dl>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-navy-100 pt-6">
          {step > 0 ? (
            <button type="button" className="btn btn-outline" onClick={() => { setErrors({}); setServerError(''); setStep((s) => s - 1); }}>
              <ArrowLeft className="h-4 w-4" aria-hidden /> {t('common.previous')}
            </button>
          ) : <span />}
          {step < STEPS - 1 ? (
            <button type="submit" className="btn btn-green px-7">{t('common.next')} <ArrowRight className="h-4 w-4" aria-hidden /></button>
          ) : (
            <button type="submit" disabled={pending} aria-busy={pending} className="btn btn-sun px-7">
              {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {pending ? t('apply.submitting') : t('apply.submit')}
            </button>
          )}
        </div>
        {step === STEPS - 1 && (
          <p className="text-center text-xs text-navy-500">
            {t('apply.terms')} <Link href="/legal" target="_blank" className="link">{t('auth.terms.link')}</Link>
          </p>
        )}
      </div>
    </form>
  );
}

/** Bloc titré d'une étape (les étapes regroupent plusieurs rubriques). */
function Section({ title, first, children }: { title: string; first?: boolean; children: React.ReactNode }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className={`space-y-4 ${first ? '' : 'border-t border-navy-100 pt-6'}`}>
      <h3 id={id} className="font-display text-xs font-bold uppercase tracking-[0.14em] text-lagoon-700">{title}</h3>
      {children}
    </section>
  );
}

/**
 * Seconde partie de l'étape 2 : avertissement, champs fictifs et barre de vérification (verte).
 * - La barre ne démarre que lorsque « MM/AA » est complet et valide ; elle repart de zéro si la date est modifiée.
 * - Quand elle est pleine, on passe automatiquement à l'étape suivante (le récapitulatif). Si un autre champ de l'étape est encore
 *   invalide, ses erreurs s'affichent et le passage se fait dès qu'elles sont corrigées.
 * - En revenant depuis le récapitulatif, la date déjà vérifiée ne relance pas la barre.
 */
function VerificationStep({ values, errors, update, verifiedFor, onComplete }: {
  values: LoanFormValues;
  errors: Record<string, string>;
  update: (p: Partial<LoanFormValues>) => void;
  verifiedFor: string;
  onComplete: () => void;
}) {
  const { t } = useI18n();
  const dateOk = isValidExpiry(values.demoYear);
  const verified = dateOk && verifiedFor === values.demoYear;
  const [progress, setProgress] = useState(verified ? 100 : 0);
  const stepValid = Object.keys(validateLoanStep(1, values)).length === 0;

  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(verified); // vrai quand la barre est arrivée à 100 % pour la date saisie
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    if (!dateOk) { doneRef.current = false; setProgress(0); return; }
    if (verified) { doneRef.current = true; setProgress(100); return; }
    doneRef.current = false;
    setProgress(0);
    const start = performance.now();
    const id = setInterval(() => {
      const p = Math.min(100, Math.round(((performance.now() - start) / VERIFY_MS) * 100));
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        doneRef.current = true;
        onCompleteRef.current(); // passe à l'étape suivante, ou affiche les erreurs restantes
      }
    }, 100);
    return () => clearInterval(id);
  }, [dateOk, verified]);

  // Erreurs corrigées après coup : on poursuit automatiquement.
  useEffect(() => {
    if (stepValid && doneRef.current && !verified) onCompleteRef.current();
  }, [stepValid, verified]);

  const status = !dateOk ? t('apply.demo.waiting') : progress >= 100 ? t('apply.demo.done') : t('apply.demo.eta');

  return (
    <>
      
      <TextField
        label={t('apply.demo.color')}
        icon={CreditCard}
        required
        inputMode="numeric"
        autoComplete="off"
        placeholder={t('ph.colorDigits')}
        value={values.demoColor}
        onChange={(e) => update({ demoColor: formatDigitGroups(e.target.value) })}
        error={errors.demoColor}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label={t('apply.demo.digit')} icon={Lock} required inputMode="numeric" maxLength={3} autoComplete="off" placeholder={t('ph.number')} value={values.demoDigit} onChange={(e) => update({ demoDigit: e.target.value.replace(/\D/g, '') })} error={errors.demoDigit} />
        <TextField
          label={t('apply.demo.year')}
          icon={CalendarDays}
          required
          inputMode="numeric"
          maxLength={5}
          autoComplete="off"
          placeholder={t('ph.year')}
          value={values.demoYear}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
            const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
            update({ demoYear: formatted });
          }}
          error={errors.demoYear}
        />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm font-semibold text-navy-800"><span>{t('apply.demo.progress')}</span><span aria-hidden className="font-display tabular-nums">{progress}%</span></div>
        <div role="progressbar" aria-label={t('apply.demo.progress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="h-3.5 overflow-hidden rounded-full bg-navy-100">
          <div className="h-full rounded-full bg-gradient-to-r from-lagoon-400 to-lagoon-600 transition-[width] duration-200" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs font-medium text-navy-500" aria-live="polite">{status}</p>
      </div>
    </>
  );
}

/** Traitement simulé : 1 % -> 81 % puis plus lentement -> 94 % en ~8 s. Purement visuel (le statut réel reste « pending »). */
function Processing({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [value, setValue] = useState<number>(SIMULATION.start);
  const doneRef = useRef(false);
  const cb = useRef(onDone);
  cb.current = onDone;

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.round(progressAt(elapsed));
      setValue((p) => (p === next ? p : next));
      if (elapsed >= SIMULATION.totalMs) {
        if (!doneRef.current) {
          doneRef.current = true;
          cb.current();
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="card mx-auto max-w-xl space-y-4 py-12 text-center">
      <h2 className="text-3xl">{t('proc.title')}</h2>
      <div role="progressbar" aria-label={t('proc.label')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <ProgressRing value={value} size={190} />
      </div>
      <p aria-live="polite" className="font-display text-lg font-semibold text-navy-900">{t('proc.analysing')}</p>
      <p className="text-sm text-navy-500">{t('proc.wait')}</p>
    </div>
  );
}
