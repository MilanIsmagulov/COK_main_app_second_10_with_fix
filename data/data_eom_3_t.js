window.dataLoaded = false;
let title_of_eom = themeOfDEC;
const data = {
    "index_1":{
        "subtitle": "Изменение массы, формы, размеров, свойств поверхности ввиду контакта детали с другими деталями или окружающей средой называется?",
        "step_of_popup": "Изменение массы, формы, размеров, свойств поверхности ввиду контакта детали с другими деталями или окружающей средой называется?",
        "test":[
            {"type": 1},
            {"answers": [
                "Приработка детали",
                "Восстановление детали",
                "Износ детали",
                "Поломка детали"
            ]},
            {"correct_answer": [2]},
            {"image": false, "image_path": "./content/video/test_video.mp4"}
        ],
    },
    "index_2":{
        "subtitle": "Вставьте недостающее слово в предложение.",
        "step_of_popup": "Вставьте недостающее слово в предложение.",
        "test": [{
            "type": 2
        }, {
            "description": " "
        }, {
            "test_with_text_2": "Одним из наиболее эффективных способов уменьшения трения является ввод слоя {=смазки} между трущимися поверхностями."
        }, {
            "image": false,
            "image_path": "./content/video/test_video.mp4"
        }],
    },
    "index_3":{
        "subtitle": "Какой вид дефекта зубчатого колеса на изображении?",
        "step_of_popup": "Какой вид дефекта зубчатого колеса на изображении?",
        "test":[
            {"type": 1},
            {"answers": [
                "Усталостное выкрашивание зубьев",
                "Излом зубьев",
                "Заедание (сваривание)"
            ]},
            {"correct_answer": [0]},
            {"image": true, "image_path": "./content/10_11_2.jpg"}
        ],
    },
    "index_4":{
        "subtitle": "Чем разрешается отогревать замёрзший воздухопровод?",
        "step_of_popup": "Чем разрешается отогревать замёрзший воздухопровод?",
        "test":[
            {"type": 1},
            {"answers": [
                "Газовой горелкой",
                "Горячей водой",
                "Паяльной лампой",
                "Факелом",
                "Паром"
            ]},
            {"correct_answer": [1,4]},
            {"image": false, "image_path": "./content/10_11_2.jpg"}
        ],
    },
    "index_5":{
        "subtitle": "Какие признаки помогают определить отсутствие правильного зацепления в червячной передаче при её эксплуатации?",
        "step_of_popup": "Какие признаки помогают определить отсутствие правильного зацепления в червячной передаче при её эксплуатации?",
        "test":[
            {"type": 1},
            {"answers": [
                "Повышенный шум при работе червячной передачи",
                "Повышенный нагрев при работе червячной передачи",
                "Утечка масла из корпуса червячной передачи",
            ]},
            {"correct_answer": [0,1]},
            {"image": false, "image_path": "./content/10_11_2.jpg"}
        ],
    },
    "index_6":{
        "subtitle": "Вставьте недостающее слово.",
        "step_of_popup": "Вставьте недостающее слово.",
        "test": [{
            "type": 2
        }, {
            "description": " "
        }, {
            "test_with_text_2": "Рукоятки молотков и кувалд должны иметь {=гладкую} поверхность."
        }, {
            "image": false,
            "image_path": "./content/video/test_video.mp4"
        }],
    },
    "index_7":{
        "subtitle": "Вставить в определение недостающие слова.",
        "step_of_popup": "Вставить в определение недостающие слова.",
        "test": [{
            "type": 2
        }, {
            "description": " "
        }, {
            "test_with_text_2": "Магнитопорошковый контроль – метод неразрушающего контроля, основанный на {=притяжении} частиц магнитного индикатора (сухого порошка, суспензии) силами неоднородных {=магнитных} полей рассеяния к поверхностным и подповерхностным (на глубине до 2-3 мм) {=дефектам}."
        }, {
            "image": false,
            "image_path": "./content/video/test_video.mp4"
        }],
    },
    "index_8":{
        "subtitle": "Установить соответствие между изображениями средств измерений и их названиями.",
        "step_of_popup": "Установить соответствие между изображениями средств измерений и их названиями.",
        "test": [{
            "type": 4
        }, {
            "image": "['./content/tests_content/03_01.png', './content/tests_content/03_02.png', './content/tests_content/03_03.png']"
        }, {
            "answers": ["Штангензубомер", "Штангенциркуль", "Микрометр"]
        }],
    },
    "index_9":{
        "subtitle": "Какие причины вызывают снижение давления воздуха в пневмоприводе?",
        "step_of_popup": "Какие причины вызывают снижение давления воздуха в пневмоприводе?",
        "test":[
            {"type": 1},
            {"answers": [
                "Утечки воздуха",
                "Износ компрессора",
                "Ослабление гаек шатунов",
                "Выкрашивание баббита в подшипниках",
                "Засорения или замерзания (зимой) линии подачи воздуха",
                "Пробуксовка приводных ремней",
            ]},
            {"correct_answer": [0,1,4,5]},
            {"image": false, "image_path": "./content/10_11_2.jpg"}
        ],
    },
    "index_10":{
        "subtitle": "Как называются предложенные средства индивидуальной защиты.",
        "step_of_popup": "Как называются предложенные средства индивидуальной защиты.",
        "test": [{
            "type": 2
        }, {
            "description": " "
        }, {
            "test_with_text_2": "Средство защиты органов дыхания, {=респиратор}<br> Средство защиты органов слуха, {=наушники}<br> Средство защиты головы, {=каска}."
        }, {
            "image": true,
            "image_path": "./content/15_11_1111.png"
        }],
    },
    "index_11":{
        "subtitle": "Какие могут быть причины отсутствия показаний давления масла в системе смазки компрессора?",
        "step_of_popup": "Какие могут быть причины отсутствия показаний давления масла в системе смазки компрессора?",
        "test":[
            {"type": 1},
            {"answers": [
                "Снизилось давление воздуха на разбрызгивание масла",
                "Слишком низкий уровень масла",
                "Слишком высокий уровень масла",
                "Неисправность манометра",
            ]},
            {"correct_answer": [1,3]},
            {"image": false, "image_path": "./content/10_11_2.jpg"}
        ],
    },
    "index_12":{
        "subtitle": "Установите правильный порядок действий при ремонте оборудования.",
        "step_of_popup": "Установите правильный порядок действий при ремонте оборудования.",
        "test": [{
            "type": 3
        }, {
            "image": false,
            "image_path": "./content/video/test_video.mp4"
        }, {
            "answers": ["Приёмка оборудования в ремонт", "Разборка оборудования на узлы, агрегаты и детали", "Очистка и мойка деталей", "Контроль и сортировка деталей с их маркировкой", "Ремонт, восстановление или изготовление новых деталей", "Сборка узлов, агрегатов и оборудования", "Регулировка и испытание отремонтированного оборудования", "Сдача отремонтированного оборудования в эксплуатацию"]
        }],
    },
    "index_13":{
        "subtitle": "Сопоставить рисунок с видом дефекта.",
        "step_of_popup": "Сопоставить рисунок с видом дефекта.",
        "test": [{
            "type": 4
        }, {
            "image": "['./content/tests_content/04_01.png', './content/tests_content/04_02.png', './content/tests_content/04_03.png', './content/tests_content/04_04.png']"
        }, {
            "answers": ["Излом", "Трещина", "Вмятина", "Задир", ]
        }],
    },
    "index_14":{
        "subtitle": "Сопоставить цвет маркировки деталей после дефектации относительно возможности их дальнейшего использования.",
        "step_of_popup": "Сопоставить цвет маркировки деталей после дефектации относительно возможности их дальнейшего использования.",
        "test":[
            {"type": 9},
            {"image": true, "image_path": "./content/empty_img.png", "image_sgn": "blablabla"},
            {"description": "Тут пишем описание задания"},
            {"definitions": [
                "Годные",
                "Годная только при сопряжении с новыми или отремонтированными до номинальных размеров деталями",
                "Подлежащие ремонту на данном предприятии",
                "Подлежащие ремонту на специализированных предприятиях",
                "Негодные для дальнейшего использования"
            ]},
            {"answers": [
                "Белая",
                "Зелёная",
                "Синяя",
                "Желтая",
                "Красная"
            ]},
            {"correct_answer_type_10": [2,4,1,3,5]}
        ],
    },
    "index_15":{
        "subtitle": "Определить по неисправности гидравлической системы возможную причину (одну из предложенных) и возможные способы устранения неисправности (все возможные) <br> <b style='font-size: 25px;' class='black_sub'>Неисправность: Гидравлический насос не создаёт необходимое давления в гидравлической системе</b>",
        "step_of_popup": "Определить по неисправности гидравлической системы возможную причину (одну из предложенных) и возможные способы устранения неисправности (все возможные)",
        "test": [{
            "type": 7
        }, {
            "anwserArr2": ['Уменьшение вязкости гидравлического масла вследствие его сильного нагрева', 'Неправильное направление вращения вала насоса', 'Повышенная влажность гидравлического масла', 'Улучшить условия охлаждения масла', 'Заменить гидравлическую жидкость на масло большей вязкости', 'Заменить гидравлическую жидкость на масло с меньшей вязкостью', 'Изменить направление вращения гидравлического насоса', 'Долить масло до необходимого уровня']
        }, {
            "answersInCol": [['Уменьшение вязкости гидравлического масла вследствие его сильного нагрева'], ['Улучшить условия охлаждения масла', 'Заменить гидравлическую жидкость на масло большей вязкости'],['Неправильное направление вращения вала насоса', 'Повышенная влажность гидравлического масла', 'Заменить гидравлическую жидкость на масло с меньшей вязкостью', 'Изменить направление вращения гидравлического насоса', 'Долить масло до необходимого уровня']]
        }, {
            "columns": ['Возможная причина', 'Способ устранения', 'Неверные варианты']
        }],
    },
    "index_16":{
        "subtitle": "Результаты",
        "step_of_popup": "Результаты",
        "result":[]
    },
}
window.dataLoaded = true;