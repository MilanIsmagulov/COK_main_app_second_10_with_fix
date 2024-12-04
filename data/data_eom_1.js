window.dataLoaded = false;
    let title_of_eom = themeOfDEC;
    let methodRecomendation = ' ';
    let dropType = 2;
    let typeOfButtons = 'video'; // Можер быть "hexagon", "lightning", "tiles" или "video" или "custom";
    let timings = [ // если typeOfButtons = 'video'
        { time: 4.16, name: "Износ" }, // если typeOfButtons = 'video'
        { time: 24.95, name: "Технологический процесс ремонта" }, // если typeOfButtons = 'video'
        { time: 30.77, name: "Дефектация" }, // если typeOfButtons = 'video'
        { time: 41.04, name: "Классификация деталей по возможности дальнейшего использования" }, // если typeOfButtons = 'video'
        { time: 49.35, name: " Смазка, назначение и виды" }, // если typeOfButtons = 'video'
        { time: 81.05, name: "Работа гидравлического привода" }, // если typeOfButtons = 'video'
    ]; // если typeOfButtons = 'video'
    let timings2 = [ // если typeOfButtons = 'video'
        { time2: 0, name2: "Система планово-предупредительного ремонта" }, // если typeOfButtons = 'video'
        { time2: 20.47, name2: "Ремонтные документы" }, // если typeOfButtons = 'video'
        { time2: 29.24, name2: "Сдача оборудования в ремонт" }, // если typeOfButtons = 'video'
        { time2: 35.87, name2: "Внеплановый ремонт оборудования" }, // если typeOfButtons = 'video'
        { time2: 58.19, name2: "Рационализация логистических процессов ремонтных работ" }, // если typeOfButtons = 'video'
        { time2: 71.05, name2: "Передовой опыт по методам поддержания работоспособности промышленного (технологического) оборудования" }, // если typeOfButtons = 'video'
    ]; // если typeOfButtons = 'video'
    let pathToVideo = './content/page_content/video_10.mp4'; // если typeOfButtons = 'video'
    let pathToVideo2 = './content/page_content/video_content2.mp4'; // если typeOfButtons = 'video'
    let videoTitle2 = ''; // если typeOfButtons = 'video'
    let videoTitle5 = 'Видеолекция "Организация ремонтной службы предприятия" Часть 2';
    const secondVideo = false;
    // В CSS должна быть к каждому id или class приписка "_custom", и закидываем их в файл "pages/eom_1_unit/styles/custom_pages.css"
    let customPage = ``; // В CSS должна быть к каждому id или class приписка "_custom", и закидываем их в файл "pages/eom_1_unit/styles/custom_pages.css"
    let background_type = dropType;
    let literaListEOM1 = 
    `Карпицкий, В. Р. Общий курс слесарного дела: учебное пособие / В.Р. Карпицкий. – 2-е изд. – Москва: ИНФРА-М, 2020. – 400с.: ил. – (Среднее профессиональное образование). – ISBN 978-5-16-004755-3.
    Сазанов, И. И. Гидравлика: учебник / И.И. Сазанов, А.Г. Схиртладзе, В.И. Иванов. – Москва: КУРС, НИЦ ИНФРА-М, 2019. – 320 с. – ISBN 978-5-906818-77-5.
    Схиртладзе, А. Г. Ремонт технологического оборудования: учебник / А. Г. Схиртладзе, В.А. Скрябин. – Москва: КУРС: ИНФРА-М, 2018. – 352 с. – ISBN 978-5-906923-80-6.
    Шейпак, А. А. Гидравлика и гидропневмопривод. Основы механики жидкости и газа: учебник / А.А. Шейпак. – 6-е изд., испр. и доп. – Москва: ИНФРА-М, 2021. – 270 с. – (Среднее профессиональное образование). – ISBN 978-5-16-013908-1.
    ГОСТы и стандарты.
    Электронная библиотечная система Znanium.com.` 
    // Список литературы
    const data = {
        "index_0":{
            "subtitle": "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
            "paragraph_1":[
                {"subtitle2lvl": "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
                {"text": " "},
                {"image": false, "image_path": "./content/page_content/test_image.png"}
            ],
            "paragraph_2":[
                {"subtitle2lvl": "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
                {"text": false},
                {"image": true, "image_path": "./content/page_content/test_video.mp4", "img_sign": " "}
            ],
            "paragraph_3":[
                {"subtitle2lvl": "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
                {"image": true, "image_path": "./content/page_content/test_video.mp4", "img_sign": " "},
                {"text":" "}
            ],
            "paragraph_4":[
                {"subtitle2lvl": "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
                {"text":" "},
                {"image": false, "image_path": "./content/page_content/test_image.png"}
            ]
        }
    };
    const themesOfEOM1 = Object.values(data).map(item => item.subtitle).join('\n');
window.dataLoaded = true;