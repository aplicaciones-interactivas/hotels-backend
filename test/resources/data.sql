INSERT INTO meal_plan(name, description, code) VALUES
('All Inclusive'    , 'Covers all meals and beverages'                             , 'AI'),
('A la carte'       , 'Covers all meals and beverages from menu'                   , 'AC'),
('American Plan'    , 'Includes  three meals per day, breakfast, lunch and dinner.','AP' ),
('Bed And Breakfast', 'Includes breakfast'                                         , 'BB'),
('Continental Plan' , 'Includes continental breakfast'                             ,'CP' ),
('European Plan'    , 'Does not include any meals.'                                , 'EP'),
('Half Board'       , 'Includes two meals per day.'                                , 'HB');
INSERT INTO bed(id, name,code) VALUES
(1,'Single'    , 'SB'),
(2,'Double'    , 'DB'),
(3,'Queen Size', 'QB'),
(4,'King Size' , 'KB');
INSERT INTO organization(id, billingAddress, country, billingIdentifier, name) VALUES
(1, 'Rua das Figueiras, 501 - Jardim - Santo André', 'BRA', '111111111', 'CVC'),
(2, 'GENERAL RIERA, 154', 'ESP', '22222222', 'Iberostar');
INSERT INTO user(id, username, password, email, organizationId) VALUES
(1, 'edhernandez', '$2y$12$S8Qdgk2//.TuObluwUNEdeTpL1N6V8WH.umzzaxzsEeJSBI1f8maS', 'hernandezed.1991@cvc.com.br', 1),
(2, 'jhondoe', '$2y$12$S8Qdgk2//.TuObluwUNEdeTpL1N6V8WH.umzzaxzsEeJSBI1f8maS', 'jhon.doe@gmail.com', null);
INSERT INTO role(id, roleName) VALUES
(1, 'ADMIN'),
(2, 'USER');
INSERT INTO user_roles_role(userId, roleId) values
(1,1),
(2,2);