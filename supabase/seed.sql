-- Categories
INSERT INTO categories (name, slug, emoji) VALUES
  ('Pain Relief', 'pain-relief', '🌿'),
  ('Sleep & Relaxation', 'sleep-relaxation', '🌙'),
  ('Digestive Health', 'digestive-health', '🌱'),
  ('Immune Support', 'immune-support', '🍓'),
  ('Energy & Focus', 'energy-focus', '⚡'),
  ('Skin Care', 'skin-care', '🌿');

-- Conditions
INSERT INTO conditions (name, slug, description, emoji, category_id) VALUES
  ('Headache', 'headache', 'Mild to moderate head pain or tension', '😤', (SELECT id FROM categories WHERE slug='pain-relief')),
  ('Muscle Pain', 'muscle-pain', 'Soreness or aching in muscles', '💪', (SELECT id FROM categories WHERE slug='pain-relief')),
  ('Insomnia', 'insomnia', 'Difficulty falling or staying asleep', '😴', (SELECT id FROM categories WHERE slug='sleep-relaxation')),
  ('Mild Anxiety', 'mild-anxiety', 'Occasional nervousness or worry', '😤', (SELECT id FROM categories WHERE slug='sleep-relaxation')),
  ('Stress', 'stress', 'Feeling overwhelmed or tense', '😔', (SELECT id FROM categories WHERE slug='sleep-relaxation')),
  ('Indigestion', 'indigestion', 'Stomach discomfort after eating', '🤢', (SELECT id FROM categories WHERE slug='digestive-health')),
  ('Nausea', 'nausea', 'Feeling of queasiness or upset stomach', '🤮', (SELECT id FROM categories WHERE slug='digestive-health')),
  ('Common Cold', 'common-cold', 'Mild respiratory symptoms and congestion', '😷', (SELECT id FROM categories WHERE slug='immune-support')),
  ('Fatigue', 'fatigue', 'Low energy and tiredness', '😩', (SELECT id FROM categories WHERE slug='energy-focus')),
  ('Dry Skin', 'dry-skin', 'Rough, flaky or irritated skin', '😅', (SELECT id FROM categories WHERE slug='skin-care'));

-- Herbs
INSERT INTO herbs (name, slug, latin_name, description, traditional_uses, preparation_dosage, safety_warnings) VALUES
  ('Peppermint', 'peppermint', 'Mentha piperita', 'A refreshing herb known for its cooling sensation and ability to soothe headaches and digestion.', 'Used for centuries in European and Asian traditions for digestive complaints, headaches, and fever reduction.', 'Tea: Steep 1–2 tsp dried leaves in 250ml hot water for 10 minutes. Essential oil: Dilute 2–3 drops in carrier oil and apply topically. Capsules: Follow label instructions.', 'Avoid in infants and young children (menthol risk). May worsen acid reflux. Do not apply undiluted essential oil to skin.'),
  ('Chamomile', 'chamomile', 'Matricaria chamomilla', 'A gentle, calming flower that promotes relaxation and supports digestive health.', 'Ancient Egyptians used chamomile for fever. Romans used it for headaches and kidney complaints.', 'Tea: Steep 2–3 tsp dried flowers in 250ml hot water for 5–10 minutes. Take up to 3 cups daily.', 'Avoid if allergic to ragweed or daisies. May interact with blood-thinning medications. Avoid in pregnancy.'),
  ('Ginger', 'ginger', 'Zingiber officinale', 'A warming root with powerful anti-inflammatory and digestive properties.', 'Used in Ayurvedic and Traditional Chinese Medicine for nausea, digestion, and inflammation.', 'Fresh tea: Simmer 1–2 tsp grated root in 250ml water for 10 minutes. Capsules: 250–500mg up to 3 times daily.', 'High doses may cause heartburn. Avoid with blood thinners. Consult doctor if pregnant (small dietary amounts considered safe).'),
  ('Lavender', 'lavender', 'Lavandula angustifolia', 'A fragrant purple flower renowned for its calming and sleep-promoting effects.', 'Used in Mediterranean folk medicine for anxiety, insomnia, and headaches for over 2,500 years.', 'Aromatherapy: Diffuse 3–5 drops. Tea: Steep 1 tsp dried flowers for 10 minutes. Topical: Dilute in carrier oil.', 'Oral lavender oil may cause constipation and headache. Avoid undiluted topical application. May cause drowsiness.'),
  ('Valerian Root', 'valerian-root', 'Valeriana officinalis', 'A potent natural sedative that has been used for centuries to improve sleep quality.', 'Used in ancient Greece and Rome as a sedative and anxiety remedy.', 'Tea: Steep 1 tsp dried root for 10–15 minutes. Take 30–60 minutes before bed. Extract: 300–600mg standardised extract.', 'May cause vivid dreams, headache, or grogginess. Do not combine with alcohol or sedatives. Avoid long-term use without consultation.'),
  ('Elderberry', 'elderberry', 'Sambucus nigra', 'A powerful immune-boosting berry that helps fight cold and flu symptoms.', 'Used in European folk medicine for colds, flu, and infections for hundreds of years.', 'Syrup: 1 tbsp (adults) or 1 tsp (children) daily for prevention. During illness: every 3–4 hours for up to 5 days.', 'Raw berries are toxic — use only prepared products. May interact with immunosuppressant medications.'),
  ('Echinacea', 'echinacea', 'Echinacea purpurea', 'A flowering plant that stimulates the immune system and helps prevent colds.', 'Native Americans used echinacea for infections and wound healing for centuries.', 'Capsules: 300–500mg three times daily during illness. Tincture: 2.5ml three times daily. Use for max 10 days.', 'Avoid with autoimmune conditions. May cause allergic reactions in those sensitive to daisies. Not for long-term daily use.'),
  ('Ashwagandha', 'ashwagandha', 'Withania somnifera', 'An adaptogenic herb that helps the body manage stress and promotes overall vitality.', 'One of the most important herbs in Ayurvedic medicine, used for over 3,000 years.', 'Capsules: 300–600mg standardised extract daily. Powder: 1–2 tsp in warm milk or smoothie.', 'Avoid in pregnancy and thyroid conditions. May interact with thyroid and immunosuppressant medications. Stop 2 weeks before surgery.'),
  ('Turmeric', 'turmeric', 'Curcuma longa', 'A golden spice with powerful anti-inflammatory and antioxidant properties.', 'Used in Ayurvedic and Traditional Chinese Medicine for thousands of years for joint pain and inflammation.', 'Capsules: 500–1000mg curcumin daily with black pepper (piperine). Golden milk: 1 tsp powder in warm milk.', 'High doses may cause stomach upset. May increase bleeding risk. Avoid with gallbladder disease.'),
  ('Fennel', 'fennel', 'Foeniculum vulgare', 'A sweet, aromatic herb that soothes digestive complaints and freshens breath.', 'Used in Mediterranean and Asian folk medicine for digestive disorders and colic.', 'Tea: Steep 1 tsp crushed seeds in 250ml hot water for 10 minutes. Take after meals.', 'Avoid in pregnancy in large amounts. May cause photosensitivity. Allergies possible if sensitive to carrots or celery.'),
  ('Aloe Vera', 'aloe-vera', 'Aloe barbadensis miller', 'A succulent plant with gel that soothes and moisturises skin naturally.', 'Used in ancient Egypt, Greece, and China for skin burns, wounds, and digestive complaints.', 'Topical: Apply fresh gel or commercial gel directly to skin 2–3 times daily. Oral: Only use products specifically labelled for internal use.', 'Oral aloe latex is a powerful laxative — avoid unless directed. Do not apply to deep wounds. May cause allergic reactions.'),
  ('Calendula', 'calendula', 'Calendula officinalis', 'A gentle flower that promotes skin healing and reduces inflammation.', 'Used in European folk medicine for wound healing, skin rashes, and inflammation.', 'Cream/salve: Apply to affected skin 2–3 times daily. Tea: Steep 1–2 tsp dried petals for 10 minutes for internal use.', 'Avoid if allergic to daisies or ragweed. Avoid internal use during pregnancy. May cause contact dermatitis in sensitive individuals.');

-- Herb Tags
INSERT INTO herb_tags (herb_id, tag) VALUES
  ((SELECT id FROM herbs WHERE slug='peppermint'), 'Relieves tension headaches'),
  ((SELECT id FROM herbs WHERE slug='peppermint'), 'Soothes upset stomach'),
  ((SELECT id FROM herbs WHERE slug='chamomile'), 'Promotes restful sleep'),
  ((SELECT id FROM herbs WHERE slug='chamomile'), 'Reduces anxiety'),
  ((SELECT id FROM herbs WHERE slug='ginger'), 'Relieves nausea'),
  ((SELECT id FROM herbs WHERE slug='ginger'), 'Reduces inflammation'),
  ((SELECT id FROM herbs WHERE slug='lavender'), 'Reduces anxiety'),
  ((SELECT id FROM herbs WHERE slug='lavender'), 'Promotes sleep'),
  ((SELECT id FROM herbs WHERE slug='valerian-root'), 'Improves sleep quality'),
  ((SELECT id FROM herbs WHERE slug='valerian-root'), 'Reduces time to fall asleep'),
  ((SELECT id FROM herbs WHERE slug='elderberry'), 'Boosts immune system'),
  ((SELECT id FROM herbs WHERE slug='elderberry'), 'Shortens cold duration'),
  ((SELECT id FROM herbs WHERE slug='echinacea'), 'Prevents and shortens colds'),
  ((SELECT id FROM herbs WHERE slug='echinacea'), 'Boosts white blood cell production'),
  ((SELECT id FROM herbs WHERE slug='ashwagandha'), 'Reduces stress and cortisol'),
  ((SELECT id FROM herbs WHERE slug='ashwagandha'), 'Improves energy levels'),
  ((SELECT id FROM herbs WHERE slug='turmeric'), 'Reduces inflammation'),
  ((SELECT id FROM herbs WHERE slug='turmeric'), 'Relieves joint pain'),
  ((SELECT id FROM herbs WHERE slug='fennel'), 'Relieves bloating'),
  ((SELECT id FROM herbs WHERE slug='fennel'), 'Eases gas and cramping'),
  ((SELECT id FROM herbs WHERE slug='aloe-vera'), 'Moisturises dry skin'),
  ((SELECT id FROM herbs WHERE slug='aloe-vera'), 'Soothes burns and irritation'),
  ((SELECT id FROM herbs WHERE slug='calendula'), 'Heals minor wounds'),
  ((SELECT id FROM herbs WHERE slug='calendula'), 'Soothes irritated skin');

-- Herb <-> Condition links
INSERT INTO herb_conditions (herb_id, condition_id) VALUES
  ((SELECT id FROM herbs WHERE slug='peppermint'), (SELECT id FROM conditions WHERE slug='headache')),
  ((SELECT id FROM herbs WHERE slug='peppermint'), (SELECT id FROM conditions WHERE slug='indigestion')),
  ((SELECT id FROM herbs WHERE slug='peppermint'), (SELECT id FROM conditions WHERE slug='nausea')),
  ((SELECT id FROM herbs WHERE slug='chamomile'), (SELECT id FROM conditions WHERE slug='insomnia')),
  ((SELECT id FROM herbs WHERE slug='chamomile'), (SELECT id FROM conditions WHERE slug='mild-anxiety')),
  ((SELECT id FROM herbs WHERE slug='chamomile'), (SELECT id FROM conditions WHERE slug='indigestion')),
  ((SELECT id FROM herbs WHERE slug='ginger'), (SELECT id FROM conditions WHERE slug='nausea')),
  ((SELECT id FROM herbs WHERE slug='ginger'), (SELECT id FROM conditions WHERE slug='muscle-pain')),
  ((SELECT id FROM herbs WHERE slug='ginger'), (SELECT id FROM conditions WHERE slug='indigestion')),
  ((SELECT id FROM herbs WHERE slug='lavender'), (SELECT id FROM conditions WHERE slug='insomnia')),
  ((SELECT id FROM herbs WHERE slug='lavender'), (SELECT id FROM conditions WHERE slug='mild-anxiety')),
  ((SELECT id FROM herbs WHERE slug='lavender'), (SELECT id FROM conditions WHERE slug='stress')),
  ((SELECT id FROM herbs WHERE slug='valerian-root'), (SELECT id FROM conditions WHERE slug='insomnia')),
  ((SELECT id FROM herbs WHERE slug='valerian-root'), (SELECT id FROM conditions WHERE slug='mild-anxiety')),
  ((SELECT id FROM herbs WHERE slug='elderberry'), (SELECT id FROM conditions WHERE slug='common-cold')),
  ((SELECT id FROM herbs WHERE slug='echinacea'), (SELECT id FROM conditions WHERE slug='common-cold')),
  ((SELECT id FROM herbs WHERE slug='echinacea'), (SELECT id FROM conditions WHERE slug='fatigue')),
  ((SELECT id FROM herbs WHERE slug='ashwagandha'), (SELECT id FROM conditions WHERE slug='stress')),
  ((SELECT id FROM herbs WHERE slug='ashwagandha'), (SELECT id FROM conditions WHERE slug='fatigue')),
  ((SELECT id FROM herbs WHERE slug='ashwagandha'), (SELECT id FROM conditions WHERE slug='mild-anxiety')),
  ((SELECT id FROM herbs WHERE slug='turmeric'), (SELECT id FROM conditions WHERE slug='muscle-pain')),
  ((SELECT id FROM herbs WHERE slug='fennel'), (SELECT id FROM conditions WHERE slug='indigestion')),
  ((SELECT id FROM herbs WHERE slug='fennel'), (SELECT id FROM conditions WHERE slug='nausea')),
  ((SELECT id FROM herbs WHERE slug='aloe-vera'), (SELECT id FROM conditions WHERE slug='dry-skin')),
  ((SELECT id FROM herbs WHERE slug='calendula'), (SELECT id FROM conditions WHERE slug='dry-skin'));
