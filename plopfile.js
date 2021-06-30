module.exports = (plop) => {
  plop.setGenerator('component', {
    description: '创建自定义模板文件',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message:
          '选择要创建的模板，所有模板文件可在项目根目录plop-templates文件夹下查看',
        // 要增加创建的模板在此处添加选择
        choices: ['List-Function', 'Card-Component'],
      },
      {
        type: 'input',
        name: 'name',
        message: '输入你的模板文件名称：',
        default: 'MyFile',
      },
      {
        type: 'input',
        name: 'title',
        message: '输入标题：',
        when: (answers) => answers.type === 'Card-Component',
      },
    ],
    actions: (data) => {
      const { type } = data;
      console.log(data);
      const actions = [];

      // 各模板相关生产逻辑
      switch (type) {
        case 'List-Function':
          actions.push({
            type: 'add',
            path: 'src/views/{{ properCase name }}/{{ properCase name }}.vue',
            templateFile: 'plop-templates/List-Function/component.vue.hbs',
          });
          actions.push({
            type: 'add',
            path: 'src/views/{{ properCase name }}/service.js',
            templateFile: 'plop-templates/List-Function/service.js.hbs',
          });
          actions.push({
            type: 'add',
            path: 'src/views/{{ properCase name }}/components/CardHeader.vue',
            templateFile:
              'plop-templates/List-Function/components/CardHeader.vue.hbs',
          });
          actions.push({
            type: 'add',
            path: 'src/views/{{ properCase name }}/components/SearchForm.vue',
            templateFile:
              'plop-templates/List-Function/components/SearchForm.vue.hbs',
          });
          break;
        case 'Card-Component':
          actions.push({
            type: 'add',
            path: 'src/views/{{ properCase name }}.vue',
            templateFile: 'plop-templates/Card-Component/Card.vue.hbs',
          });
          break;
        default:
          break;
      }
      return actions;
    },
  });
};
