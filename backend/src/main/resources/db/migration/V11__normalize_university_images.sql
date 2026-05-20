-- Use bundled university images and hide duplicate seed rows that were
-- creating initials-only cards in the frontend carousel.

UPDATE universities
SET active = 0
WHERE slug IN (
  'andhra-university',
  'chandigarh-university',
  'galgotias-university',
  'gla-university',
  'kurukshetra-university',
  'op-jindal-university',
  'parul-university'
);

UPDATE universities
SET primary_image = CASE slug
  WHEN 'amity' THEN '/universities/amity/primary.png'
  WHEN 'andhra' THEN '/universities/andhra/primary.png'
  WHEN 'chandigarh' THEN '/universities/chandigarh/primary.png'
  WHEN 'dy-patil-mumbai' THEN '/universities/dy-patil-mumbai/primary.png'
  WHEN 'dy-patil-pune' THEN '/universities/dy-patil-pune/primary.png'
  WHEN 'galgotias' THEN '/universities/galgotias/primary.png'
  WHEN 'gla' THEN '/universities/gla/primary.png'
  WHEN 'jain-online' THEN '/universities/parul/primary.png'
  WHEN 'jamia' THEN '/universities/kurukshetra/primary.png'
  WHEN 'kurukshetra' THEN '/universities/kurukshetra/primary.png'
  WHEN 'lpu' THEN '/universities/lpu/primary.png'
  WHEN 'mahe' THEN '/universities/mahe/primary.png'
  WHEN 'muj' THEN '/universities/muj/primary.png'
  WHEN 'nmims' THEN '/universities/nmims/primary.png'
  WHEN 'opjindal' THEN '/universities/opjindal/primary.png'
  WHEN 'parul' THEN '/universities/parul/primary.png'
  WHEN 'sharda' THEN '/universities/sharda/primary.png'
  WHEN 'shoolini' THEN '/universities/shoolini/primary.png'
  WHEN 'smu' THEN '/universities/smu/primary.png'
  WHEN 'upes' THEN '/universities/upes/primary.png'
  WHEN 'uttaranchal' THEN '/universities/uttaranchal/primary.png'
  WHEN 'vgu' THEN '/universities/vgu/primary.png'
  ELSE primary_image
END
WHERE slug IN (
  'amity',
  'andhra',
  'chandigarh',
  'dy-patil-mumbai',
  'dy-patil-pune',
  'galgotias',
  'gla',
  'jain-online',
  'jamia',
  'kurukshetra',
  'lpu',
  'mahe',
  'muj',
  'nmims',
  'opjindal',
  'parul',
  'sharda',
  'shoolini',
  'smu',
  'upes',
  'uttaranchal',
  'vgu'
);
