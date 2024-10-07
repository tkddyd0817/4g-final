

const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');
const book = document.querySelector('ul')
const comments = new Map();

document.addEventListener('DOMContentLoaded', () => {
    addBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    nameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    book.addEventListener('click', handleBtnClickInPageHeader);
    createBookPage({ name: '정청', comment: '어이 브라더' });
    document.querySelector('#review').addEventListener('click', review);
});

function handleBtnClickInPageHeader(e) {
    const target = e.target;
    const name = target.dataset.name;
    const li = target.closest('li');
    const commentId = Number(li.dataset.id);
    const comment = li.querySelector('textarea[data-name=comment]')

    if (target.nodeName === 'BUTTON') {
        if (name === 'delete') {
            li.remove();
            comments.delete(commentId);
            return;
        } else if (name === 'update') {
            comment.readOnly = false;
        } else if (name === 'save') {
            comment.readOnly = true;
            comments.set(commentId, comment.value);
        } else if (name === 'cancel') {
            comment.readOnly = true;
            comment.value = comments.get(commentId);
        }
        toggleAllBtn(li);
    }
}

function toggleAllBtn(li) {
    const buttons = [
        li.querySelector('button[data-name=update]'),
        li.querySelector('button[data-name=delete]'),
        li.querySelector('button[data-name=save]'),
        li.querySelector('button[data-name=cancel]'),
    ]
    buttons.forEach((btn) => $(btn).toggle());
}
function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;
    if (name && comment) {
        createBookPage({ name, comment });
        nameInput.value = '';
        commentInput.value = '';
    } else {
        alert('이름과 댓글을 모두 입력하세요!');
    }
}

function createBookPage(inputData) {
    const page = document.createElement('li');
    const id = new Date().getTime();
    page.classList.add('book__page');
    page.setAttribute('data-id', id)
    page.appendChild(createPageHeader(inputData));
    page.appendChild(createPageContent(inputData));

    document.querySelector('ul').appendChild(page);
    comments.set(id, inputData.comment);
}

function createPageHeader({ name }) {
    const pageHeader = document.createElement('div');
    pageHeader.classList.add('page-header');

    const pageHeaderName = document.createElement('div');
    pageHeaderName.classList.add('page-header__name');
    pageHeaderName.textContent = name;

    const pageHeaderDate = document.createElement('div');
    pageHeaderDate.classList.add('page-header__date');
    pageHeaderDate.textContent = `( ${yymmddhhmm()} )`;

    const updateButton = document.createElement('button');
    updateButton.classList += 'btn btn_primary page-header__update';
    updateButton.setAttribute('data-name', 'update');
    updateButton.textContent = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.classList += 'btn btn_delete page-header__delete';
    deleteButton.setAttribute('data-name', 'delete');
    deleteButton.textContent = '삭제';

    const saveButton = document.createElement('button');
    saveButton.classList += 'btn btn_success btn_hide page-header__update';
    saveButton.setAttribute('data-name', 'save');
    saveButton.textContent = '저장';

    const cancelButton = document.createElement('button');
    cancelButton.classList += 'btn btn_delete btn_hide page-header__delete';
    cancelButton.setAttribute('data-name', 'cancel');
    cancelButton.textContent = '취소';

    pageHeader.appendChild(pageHeaderName);
    pageHeader.appendChild(pageHeaderDate);
    pageHeader.appendChild(updateButton);
    pageHeader.appendChild(saveButton);
    pageHeader.appendChild(deleteButton);
    pageHeader.appendChild(cancelButton);
    return pageHeader;
}

function createPageContent({ comment, profileImg }) {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    const pageContentImg = document.createElement('div');
    pageContentImg.classList.add('page-content__img');

    const pageContentMessage = document.createElement('textarea');
    pageContentMessage.classList.add('page-content__comment');
    pageContentMessage.setAttribute('data-name', 'comment');
    pageContentMessage.setAttribute('maxlength', 1000);
    pageContentMessage.value = comment;
    pageContentMessage.readOnly = true;

    if (profileImg) {
        pageContentImg.style.backgroundImage = `url(${profileImg})`;
        pageContentImg.classList.add('page-content__img_review');
    }
    pageContent.appendChild(pageContentImg);
    pageContent.appendChild(pageContentMessage);
    return pageContent;
}

function yymmddhhmm() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function review() {
    document.querySelector('ul').replaceChildren();
    createBookPage({ name: '박상기', comment: '아주아주 열정적인 팀원들과 같이 실시간으로 성장하는 느낌이 들어서 좋았습니다.\n프로젝트를 진행하는 내내 따뜻하고 웃음이 끊이지 않아서 너무 좋았습니다.', profileImg: '../images/sang.jpg' });
    createBookPage({ name: '정은혜', comment: '코딩을 시작한 지 얼마 안 돼서 프로젝트에 참여한다는 것이 부담스러워 중간에 포기할 뻔했으나,\n팀원들의 격려와 응원으로 두려움을 극복할 수 있었습니다.\n많은 것을 알려준 팀원들에게 정말 고맙습니다!', profileImg: '../images/jeong.jpg' });
    createBookPage({ name: '박준석', comment: '다들 처음 시작하는 거라 어려움이 많았음에도 불구하고 누구 한 명 소극적인 모습 없이\n적극적으로 다 같이 고민하고 해결하려는 모습이 보였습니다.\n한 층 더 성장할 수 있는 좋은 시간이었습니다.', profileImg: '../images/jun.jpg' });
    createBookPage({ name: '강대은', comment: '프로젝트하면서 아직 개념이 많이 부족하다는 걸 느꼈습니다.\n틈틈이 개념, 용어 정리를 하여 빠른 시일 내에 함수를 자유자재로 써먹을 수 있도록 하겠습니다.', profileImg: '../images/kang.jpg' });
    createBookPage({ name: '신상용', comment: '이번 프로젝트를 진행하며 여러 사람들과 결과물을 만들어내는 것에 성취감을 느낄 수 있었으며\n많은 시간을 쓰기보다는 시간을 효율적으로 쓰는 것에 소중함을 느낄 수 있었습니다.', profileImg: '../images/shin.jpg' });
}