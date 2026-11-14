# Fonds de soutien outre-mer — livraison (ta logique + nouveau design + nouveau nom)

Cette version part de TON fichier (`files (4).zip`) : toutes tes modifications sont conservées à l'identique
(formulaire en 3 étapes, champ Pays, devises EUR/USD/XPF, description facultative, redirection vers la demande après inscription,
SQL `modif_finale.sql`, tests, `check-i18n.mjs`, documentation backend). Dessus j'ai remis :

1. le **nouveau design** (frontend + admin) ;
2. le **nouveau nom** « Fonds de soutien outre-mer » partout (y compris ton `LISEZ-MOI.md` du backend).

Ordre de mise en ligne : voir `backend/LISEZ-MOI.md` (Supabase d'abord avec `supabase/modif_finale.sql`, puis frontend, puis admin).
Après remplacement des dossiers : `npm install` (deux paquets de polices Fontsource ajoutés).

Vérifié : frontend typecheck + 46 tests + contrôle des clés FR/EN + build ; admin typecheck + build ; backend 17 tests statiques.
Non vérifié : suite SQL sur PostgreSQL, Supabase/Vercel réels, rendu visuel dans un navigateur (à contrôler après déploiement).
