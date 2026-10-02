// Contenu des pages légales. Une entrée `string` est un paragraphe,
// une entrée `string[]` est une liste à puces.
export type LegalSection = {
  id: string;
  title: string;
  content: (string | string[])[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  eyebrow: "Confidentialité",
  title: "Politique de confidentialité",
  intro:
    "Cette politique explique quelles données personnelles GO collecte lorsque vous utilisez le site et l'application, pourquoi nous les collectons, combien de temps nous les conservons et comment exercer vos droits.",
  updatedAt: "1er octobre 2026",
  sections: [
    {
      id: "responsable",
      title: "Qui est responsable de vos données ?",
      content: [
        "Le responsable du traitement est l'éditeur de la plateforme GO, service de covoiturage inter-urbain opérant en République du Bénin (ci-après « GO », « nous »).",
        "Les traitements décrits ici sont réalisés conformément à la loi n° 2017-20 du 20 avril 2018 portant Code du numérique en République du Bénin, dont le Livre V est consacré à la protection des données à caractère personnel.",
        "Pour toute question relative à vos données, écrivez-nous à contact@goapp.bj.",
      ],
    },
    {
      id: "donnees-collectees",
      title: "Les données que nous collectons",
      content: [
        "Nous ne collectons que les données nécessaires au fonctionnement du service :",
        [
          "Données de compte : nom, adresse e-mail, numéro de téléphone et mot de passe (stocké sous forme chiffrée, jamais en clair).",
          "Données de vérification d'identité : copie de votre pièce d'identité (CNI, passeport ou CIP) et statut de sa vérification.",
          "Données conducteur : numéro de permis de conduire, informations sur le véhicule (marque, modèle, plaque d'immatriculation, photo) et note moyenne attribuée par les voyageurs.",
          "Données de trajet et de réservation : villes de départ et d'arrivée, dates, prix, nombre de places, historique des réservations.",
          "Données de localisation : position GPS du conducteur pendant un trajet en cours uniquement (départ, positions intermédiaires, arrivée).",
          "Données de paiement : montant, statut et référence des transactions. Les informations de votre compte Mobile Money sont traitées directement par notre prestataire de paiement ; GO ne les conserve pas.",
          "Avis et litiges : notes, commentaires laissés après un trajet et motifs des litiges signalés.",
          "Données techniques : cookie de session nécessaire à la connexion, adresse IP et journaux techniques à des fins de sécurité.",
        ],
      ],
    },
    {
      id: "finalites",
      title: "Pourquoi nous les utilisons",
      content: [
        [
          "Créer et gérer votre compte, et vous authentifier.",
          "Vérifier l'identité des utilisateurs, ainsi que le permis et le véhicule des conducteurs, avant toute publication de trajet.",
          "Publier les trajets, gérer les réservations et mettre en relation conducteurs et voyageurs.",
          "Encaisser les paiements, bloquer les fonds jusqu'à la fin du trajet puis les reverser au conducteur.",
          "Permettre le suivi en temps réel d'un trajet en cours, pour la sécurité de tous.",
          "Traiter les litiges, les remboursements et les demandes adressées au support.",
          "Prévenir la fraude et garantir la sécurité de la plateforme.",
          "Respecter nos obligations légales, notamment comptables.",
        ],
        "Ces traitements reposent sur l'exécution du contrat qui nous lie (les conditions d'utilisation), sur notre intérêt légitime à sécuriser la plateforme, et sur nos obligations légales. Nous n'utilisons pas vos données à des fins publicitaires et ne les vendons jamais.",
      ],
    },
    {
      id: "partage",
      title: "Avec qui nous les partageons",
      content: [
        "Vos données ne sont partagées qu'avec les personnes qui en ont besoin pour que le service fonctionne :",
        [
          "Les autres utilisateurs, dans la limite nécessaire au trajet : le voyageur voit le prénom, la note et le véhicule du conducteur ; le conducteur voit le nom et le nombre de places réservées par chaque voyageur. Le numéro de téléphone n'est communiqué qu'une fois la réservation confirmée.",
          "Notre prestataire de paiement FedaPay, qui traite les paiements et versements Mobile Money.",
          "Nos prestataires techniques (hébergement, envoi d'e-mails), tenus à la confidentialité et agissant uniquement sur nos instructions.",
          "Les autorités administratives ou judiciaires, uniquement lorsque la loi nous y oblige.",
        ],
      ],
    },
    {
      id: "localisation",
      title: "Localisation pendant les trajets",
      content: [
        "La position du conducteur est enregistrée uniquement entre le démarrage et la fin d'un trajet. Elle est visible par les voyageurs ayant réservé sur ce trajet et par l'équipe GO.",
        "En dehors d'un trajet en cours, GO ne collecte aucune donnée de localisation. Les positions des voyageurs ne sont jamais enregistrées.",
      ],
    },
    {
      id: "conservation",
      title: "Combien de temps nous les conservons",
      content: [
        [
          "Données de compte : pendant toute la durée d'utilisation du compte, puis 3 ans après sa dernière activité ou sa suppression.",
          "Pièces d'identité et permis : pendant la durée du compte, puis supprimés au plus tard 1 an après sa fermeture.",
          "Positions GPS : 12 mois après la fin du trajet, pour permettre le traitement d'éventuels litiges ou incidents.",
          "Transactions et justificatifs de paiement : 10 ans, conformément aux obligations comptables de l'Acte uniforme OHADA.",
          "Cookie de session : jusqu'à la fermeture du navigateur ou la déconnexion.",
        ],
      ],
    },
    {
      id: "securite",
      title: "Sécurité",
      content: [
        "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : connexions chiffrées (HTTPS), mots de passe hachés, accès aux pièces d'identité restreint à l'équipe de vérification, et journalisation des accès sensibles.",
        "Aucun système n'étant infaillible, nous vous informerons dans les meilleurs délais en cas de violation de données susceptible de vous concerner.",
      ],
    },
    {
      id: "droits",
      title: "Vos droits",
      content: [
        "Conformément au Code du numérique, vous disposez des droits suivants sur vos données :",
        [
          "Droit d'accès et d'obtenir une copie de vos données.",
          "Droit de rectification des données inexactes, directement depuis les paramètres de votre compte ou en nous contactant.",
          "Droit d'effacement, sous réserve des données que nous devons conserver pour des obligations légales.",
          "Droit d'opposition et de limitation de certains traitements.",
        ],
        "Pour exercer ces droits, écrivez à contact@goapp.bj depuis l'adresse associée à votre compte. Nous répondons dans un délai d'un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l'Autorité de Protection des Données à caractère Personnel (APDP) du Bénin.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      content: [
        "Le site GO utilise uniquement un cookie strictement nécessaire pour maintenir votre session de connexion. Nous n'utilisons ni cookie publicitaire, ni outil de pistage tiers.",
      ],
    },
    {
      id: "modifications",
      title: "Modifications de cette politique",
      content: [
        "Nous pouvons faire évoluer cette politique, par exemple lors de l'ajout d'une fonctionnalité. La date de mise à jour figure en haut de cette page. En cas de changement important, nous vous en informerons par e-mail ou dans l'application.",
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  eyebrow: "Conditions",
  title: "Conditions d'utilisation",
  intro:
    "Ces conditions encadrent l'utilisation de GO par les voyageurs et les conducteurs. En créant un compte, vous les acceptez. Prenez quelques minutes pour les lire : elles décrivent vos droits, vos engagements et les nôtres.",
  updatedAt: "1er octobre 2026",
  sections: [
    {
      id: "objet",
      title: "Objet du service",
      content: [
        "GO est une plateforme de mise en relation entre des conducteurs particuliers qui disposent de places libres sur un trajet inter-urbain au Bénin et des voyageurs qui souhaitent effectuer ce même trajet.",
        "GO n'est pas un transporteur. Le trajet est réalisé sous la seule responsabilité du conducteur ; GO fournit l'outil de publication, de réservation, de paiement et de suivi.",
      ],
    },
    {
      id: "compte",
      title: "Création de compte",
      content: [
        [
          "Vous devez avoir au moins 18 ans pour créer un compte.",
          "Les informations fournies (nom, e-mail, téléphone) doivent être exactes et tenues à jour.",
          "Votre compte est personnel : vous êtes responsable de la confidentialité de votre mot de passe et de toute activité réalisée depuis votre compte.",
          "Un même utilisateur ne peut détenir qu'un seul compte.",
        ],
      ],
    },
    {
      id: "conducteurs",
      title: "Devenir conducteur",
      content: [
        "Pour publier un trajet, vous devez d'abord faire vérifier votre profil par l'équipe GO :",
        [
          "une pièce d'identité valide (CNI, passeport ou CIP) ;",
          "un permis de conduire en cours de validité ;",
          "un véhicule dont vous avez l'usage légal, avec sa plaque d'immatriculation et une photo.",
        ],
        "Le conducteur s'engage à disposer d'une assurance en cours de validité couvrant les passagers transportés, à respecter le Code de la route, et à maintenir son véhicule en bon état. GO peut refuser ou retirer une vérification à tout moment en cas de document invalide ou de comportement contraire à ces conditions.",
      ],
    },
    {
      id: "trajets",
      title: "Publication des trajets",
      content: [
        [
          "Le conducteur fixe la ville de départ, la ville d'arrivée, la date, l'heure et le prix par place.",
          "Le prix doit correspondre à un partage des frais du trajet (carburant, péage, usure) : GO n'est pas destiné à une activité de transport commercial.",
          "Le conducteur s'engage à n'accepter que le nombre de passagers correspondant aux places publiées, et à respecter l'heure de départ annoncée.",
          "Le conducteur démarre le trajet dans l'application au moment du départ et le termine à l'arrivée.",
        ],
      ],
    },
    {
      id: "reservations",
      title: "Réservation et paiement",
      content: [
        "Le voyageur réserve une ou plusieurs places et paie en ligne au moment de la réservation, via Mobile Money par l'intermédiaire de notre prestataire FedaPay. Le montant payé correspond au prix par place multiplié par le nombre de places réservées ; aucun frais caché n'est ajouté.",
        "La réservation n'est confirmée qu'après validation du paiement. En cas d'échec du paiement, la réservation est automatiquement annulée.",
        "Les fonds sont conservés par GO pendant le trajet et ne sont reversés au conducteur que 24 heures après que le trajet a été marqué comme terminé, sauf litige ouvert pendant ce délai.",
      ],
    },
    {
      id: "annulation",
      title: "Annulation et remboursement",
      content: [
        [
          "Annulation par le conducteur : si le conducteur annule un trajet, les voyageurs ayant réservé sont intégralement remboursés.",
          "Annulation par le voyageur plus de 24 heures avant le départ : remboursement intégral.",
          "Annulation par le voyageur moins de 24 heures avant le départ, ou absence au point de départ : aucun remboursement, le montant est reversé au conducteur.",
        ],
        "Les remboursements sont effectués sur le compte Mobile Money ayant servi au paiement, dans un délai indicatif de 7 jours ouvrés.",
      ],
    },
    {
      id: "litiges",
      title: "Litiges entre utilisateurs",
      content: [
        "Si un trajet ne s'est pas déroulé comme prévu (trajet non effectué, comportement inapproprié, écart important avec l'annonce), le voyageur peut signaler un litige depuis sa réservation tant que les fonds n'ont pas été reversés au conducteur.",
        "Le signalement bloque le versement. L'équipe GO examine les éléments disponibles (historique du trajet, positions GPS, échanges, avis) et tranche soit en faveur du conducteur, à qui les fonds sont alors reversés, soit en faveur du voyageur, qui est remboursé.",
        "La décision de GO est prise de bonne foi et ne prive aucune partie de son droit de saisir les juridictions compétentes.",
      ],
    },
    {
      id: "avis",
      title: "Avis et notation",
      content: [
        "Après un trajet, le voyageur peut laisser une note et un avis sur le conducteur. Un seul avis est possible par réservation. Les avis doivent être sincères, respectueux et liés au trajet effectué ; GO se réserve le droit de supprimer tout avis injurieux, diffamatoire ou sans rapport.",
      ],
    },
    {
      id: "versements",
      title: "Versements aux conducteurs",
      content: [
        "Les montants débloqués sont crédités sur le portefeuille GO du conducteur, qui peut en demander le versement vers son compte Mobile Money depuis son espace. Le conducteur est seul responsable des déclarations fiscales liées aux sommes perçues.",
      ],
    },
    {
      id: "comportement",
      title: "Règles de bonne conduite",
      content: [
        "Tous les utilisateurs s'engagent à :",
        [
          "se comporter avec courtoisie et respect envers les autres utilisateurs ;",
          "ne pas transporter ou faire transporter d'objets illicites ou dangereux ;",
          "ne pas organiser le paiement d'un trajet en dehors de la plateforme ;",
          "ne pas utiliser GO à des fins frauduleuses ou contraires à la loi.",
        ],
        "En cas de manquement, GO peut suspendre ou supprimer le compte concerné, après avoir, sauf urgence, invité l'utilisateur à s'expliquer.",
      ],
    },
    {
      id: "responsabilite",
      title: "Responsabilité",
      content: [
        "GO met tout en œuvre pour assurer la disponibilité et la sécurité de la plateforme, sans pouvoir garantir une absence totale d'interruption. GO n'est pas partie au contrat de covoiturage conclu entre conducteur et voyageur et ne saurait être tenu responsable des retards, accidents ou dommages survenus pendant le trajet, qui relèvent de la responsabilité du conducteur et de son assurance.",
      ],
    },
    {
      id: "donnees",
      title: "Données personnelles",
      content: [
        "Le traitement de vos données est décrit dans notre politique de confidentialité, qui fait partie intégrante des présentes conditions.",
      ],
    },
    {
      id: "droit-applicable",
      title: "Droit applicable et modifications",
      content: [
        "Les présentes conditions sont régies par le droit béninois. En cas de différend, les parties recherchent d'abord une solution amiable ; à défaut, les tribunaux de Cotonou sont compétents.",
        "GO peut modifier ces conditions. Les utilisateurs sont informés de tout changement important au moins 15 jours avant son entrée en vigueur ; la poursuite de l'utilisation du service vaut acceptation.",
        "Pour toute question : contact@goapp.bj.",
      ],
    },
  ],
};
