<?php
/**
 * Entity definitions — a single config drives the generic list/edit/delete CRUD.
 * Each field: [key, label, type, opts]
 *   types: text | textarea | html | select | number | date | image | email
 *   opts:  required(bool), options(array for select), help(string), placeholder(string)
 */

$STATUS_PUB  = ['published' => 'Published', 'draft' => 'Draft'];
$STATUS_JOB  = ['active' => 'Active', 'closed' => 'Closed'];

return [

'departments' => [
    'label'=>'Departments','singular'=>'Department','icon'=>'stethoscope','table'=>'departments',
    'order'=>'display_order, name',
    'list_cols'=>['name'=>'Name','category'=>'Category','display_order'=>'Order','status'=>'Status'],
    'fields'=>[
        ['name','Name','text',['required'=>true]],
        ['slug','Slug (URL)','text',['required'=>true,'help'=>'Lowercase, hyphenated. e.g. general-medicine']],
        ['category','Category','select',['options'=>['opd'=>'OPD / Resident','visiting'=>'Visiting'],'required'=>true]],
        ['short_desc','Short description','textarea',[]],
        ['overview','Overview','html',['help'=>'HTML allowed. Shown on the department page.']],
        ['services','Services','textarea',['help'=>'One service per line.']],
        ['thumb_image','Thumbnail image','image',[]],
        ['hero_image','Hero image','image',[]],
        ['seo_title','SEO title','text',[]],
        ['meta_description','Meta description','textarea',[]],
        ['display_order','Display order','number',[]],
        ['status','Status','select',['options'=>$STATUS_PUB,'required'=>true]],
    ],
],

'doctors' => [
    'label'=>'Doctors','singular'=>'Doctor','icon'=>'users','table'=>'doctors',
    'order'=>'doctor_type, display_order, name',
    'list_cols'=>['name'=>'Name','doctor_type'=>'Type','department'=>'Department','status'=>'Status'],
    'fields'=>[
        ['name','Full name','text',['required'=>true]],
        ['doctor_type','Type','select',['options'=>['resident'=>'Resident consultant','visiting'=>'Visiting specialist','support'=>'Support / allied'],'required'=>true]],
        ['department','Department','text',['help'=>'Free text, e.g. Orthopaedics']],
        ['qualification','Qualification','text',['placeholder'=>'MBBS, MD']],
        ['designation','Designation','text',[]],
        ['image','Photo','image',[]],
        ['available_days','Available days','text',['placeholder'=>'Mon – Sat']],
        ['available_time','Available time','text',[]],
        ['base_city','Note / base city','text',['help'=>'For visiting doctors, e.g. base hospital.']],
        ['short_bio','Short bio','textarea',[]],
        ['full_bio','Full bio','html',['help'=>'HTML allowed.']],
        ['display_order','Display order','number',[]],
        ['status','Status','select',['options'=>$STATUS_PUB,'required'=>true]],
    ],
],

'blog_posts' => [
    'label'=>'Blog Posts','singular'=>'Post','icon'=>'quote','table'=>'blog_posts',
    'order'=>'publish_date DESC, id DESC',
    'list_cols'=>['title'=>'Title','category'=>'Category','publish_date'=>'Date','status'=>'Status'],
    'fields'=>[
        ['title','Title','text',['required'=>true]],
        ['slug','Slug (URL)','text',['required'=>true]],
        ['category','Category','text',[]],
        ['author','Author','text',[]],
        ['publish_date','Publish date','date',[]],
        ['featured_image','Featured image','image',[]],
        ['excerpt','Excerpt','textarea',[]],
        ['content','Content','html',['required'=>true,'help'=>'HTML allowed.']],
        ['seo_title','SEO title','text',[]],
        ['meta_description','Meta description','textarea',[]],
        ['status','Status','select',['options'=>$STATUS_PUB,'required'=>true]],
    ],
],

'events' => [
    'label'=>'Events','singular'=>'Event','icon'=>'award','table'=>'events',
    'order'=>'event_date DESC, id DESC',
    'list_cols'=>['title'=>'Title','event_date'=>'Date','status'=>'Status'],
    'fields'=>[
        ['title','Title','text',['required'=>true]],
        ['slug','Slug (URL)','text',['required'=>true]],
        ['event_date','Event date','date',[]],
        ['cover_image','Cover image','image',[]],
        ['description','Description','html',['help'=>'HTML allowed.']],
        ['gallery','Gallery images','textarea',['help'=>'Pipe-separated web paths, e.g. assets/images/events/event-1.jpg|assets/images/events/event-2.jpg']],
        ['status','Status','select',['options'=>$STATUS_PUB,'required'=>true]],
    ],
],

'gallery_images' => [
    'label'=>'Gallery','singular'=>'Gallery image','icon'=>'scan','table'=>'gallery_images',
    'order'=>'album, display_order, id',
    'list_cols'=>['title'=>'Title','album'=>'Album','display_order'=>'Order'],
    'fields'=>[
        ['title','Title / caption','text',[]],
        ['album','Album','select',['options'=>['Facilities'=>'Facilities','Events'=>'Events'],'required'=>true]],
        ['image','Image','image',['required'=>true]],
        ['display_order','Display order','number',[]],
    ],
],

'careers' => [
    'label'=>'Careers','singular'=>'Job','icon'=>'shield','table'=>'careers',
    'order'=>'display_order, id',
    'list_cols'=>['title'=>'Title','department'=>'Department','type'=>'Type','status'=>'Status'],
    'fields'=>[
        ['title','Job title','text',['required'=>true]],
        ['department','Department','text',[]],
        ['location','Location','text',['placeholder'=>'Bhatkal']],
        ['type','Type','text',['placeholder'=>'Full-time']],
        ['description','Description','html',['help'=>'HTML allowed.']],
        ['requirements','Requirements','html',['help'=>'HTML allowed. Use a <ul> list.']],
        ['apply_email','Apply email','email',[]],
        ['display_order','Display order','number',[]],
        ['status','Status','select',['options'=>$STATUS_JOB,'required'=>true]],
    ],
],

'testimonials' => [
    'label'=>'Testimonials','singular'=>'Testimonial','icon'=>'star','table'=>'testimonials',
    'order'=>'display_order, id',
    'list_cols'=>['name'=>'Name','location'=>'Location','rating'=>'Rating','status'=>'Status'],
    'fields'=>[
        ['name','Name','text',['required'=>true]],
        ['location','Location','text',[]],
        ['quote','Quote','textarea',['required'=>true]],
        ['rating','Rating (1–5)','number',[]],
        ['display_order','Display order','number',[]],
        ['status','Status','select',['options'=>$STATUS_PUB,'required'=>true]],
    ],
],

'faqs' => [
    'label'=>'FAQs','singular'=>'FAQ','icon'=>'quote','table'=>'faqs',
    'order'=>'display_order, id',
    'list_cols'=>['question'=>'Question','display_order'=>'Order','status'=>'Status'],
    'fields'=>[
        ['question','Question','text',['required'=>true]],
        ['answer','Answer','textarea',['required'=>true]],
        ['display_order','Display order','number',[]],
        ['status','Status','select',['options'=>$STATUS_PUB,'required'=>true]],
    ],
],

];
