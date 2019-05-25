const html = String.raw;

const oldHTML = html`
  <aside>
    <ul>
      <li><a href="{%ROOT%}/">Introduction</a></li>
      <hr />
      <li>
        <a href="{%ROOT%}/declaration-of-independence"
          >Declaration of Independence</a
        >
      </li>
      <hr />
      <li><a href="{%ROOT%}/preamble">Preamble</a></li>
      <li>
        <a href="{%ROOT%}/article/I">Article I</a>
        <ul>
          <a href="{%ROOT%}/article/I/1">
            <li>Section 1</li>
          </a>
          <a href="{%ROOT%}/article/I/2">
            <li>Section 2</li>
          </a>
          <a href="{%ROOT%}/article/I/3">
            <li>Section 3</li>
          </a>
          <a href="{%ROOT%}/article/I/4">
            <li>Section 4</li>
          </a>
          <a href="{%ROOT%}/article/I/5">
            <li>Section 5</li>
          </a>
          <a href="{%ROOT%}/article/I/6">
            <li>Section 6</li>
          </a>
          <a href="{%ROOT%}/article/I/7">
            <li>Section 7</li>
          </a>
          <a href="{%ROOT%}/article/I/8">
            <li>Section 8</li>
          </a>
          <a href="{%ROOT%}/article/I/9">
            <li>Section 9</li>
          </a>
          <a href="{%ROOT%}/article/I/10">
            <li>Section 10</li>
          </a>
        </ul>
      </li>
      <li>
        <a href="{%ROOT%}/article/II">Article II</a>
        <ul>
          <a href="{%ROOT%}/article/II/1">
            <li>Section 1</li>
          </a>
          <a href="{%ROOT%}/article/II/2">
            <li>Section 2</li>
          </a>
          <a href="{%ROOT%}/article/II/3">
            <li>Section 3</li>
          </a>
          <a href="{%ROOT%}/article/II/4">
            <li>Section 4</li>
          </a>
        </ul>
      </li>
      <li>
        <a href="{%ROOT%}/article/III">Article III</a>
        <ul>
          <a href="{%ROOT%}/article/III/1">
            <li>Section 1</li>
          </a>
          <a href="{%ROOT%}/article/III/2">
            <li>Section 2</li>
          </a>
          <a href="{%ROOT%}/article/III/3">
            <li>Section 3</li>
          </a>
        </ul>
      </li>
      <li>
        <a href="{%ROOT%}/article/IV">Article IV</a>
        <ul>
          <a href="{%ROOT%}/article/IV/1">
            <li>Section 1</li>
          </a>
          <a href="{%ROOT%}/article/IV/2">
            <li>Section 2</li>
          </a>
          <a href="{%ROOT%}/article/IV/3">
            <li>Section 3</li>
          </a>
          <a href="{%ROOT%}/article/IV/4">
            <li>Section 4</li>
          </a>
        </ul>
      </li>
      <li><a href="{%ROOT%}/article/V">Article V</a></li>
      <li><a href="{%ROOT%}/article/VI">Article VI</a></li>
      <li><a href="{%ROOT%}/article/VII">Article VII</a></li>
      <hr />
      <li>
        <a href="{%ROOT%}/bill-of-rights">Bill of Rights</a>
        <ul>
          <a href="{%ROOT%}/amendment/1">
            <li>Amendment 1</li>
          </a>
          <a href="{%ROOT%}/amendment/2">
            <li>Amendment 2</li>
          </a>
          <a href="{%ROOT%}/amendment/3">
            <li>Amendment 3</li>
          </a>
          <a href="{%ROOT%}/amendment/4">
            <li>Amendment 4</li>
          </a>
          <a href="{%ROOT%}/amendment/5">
            <li>Amendment 5</li>
          </a>
          <a href="{%ROOT%}/amendment/6">
            <li>Amendment 6</li>
          </a>
          <a href="{%ROOT%}/amendment/7">
            <li>Amendment 7</li>
          </a>
          <a href="{%ROOT%}/amendment/8">
            <li>Amendment 8</li>
          </a>
          <a href="{%ROOT%}/amendment/9">
            <li>Amendment 9</li>
          </a>
          <a href="{%ROOT%}/amendment/10">
            <li>Amendment 10</li>
          </a>
        </ul>
      </li>
      <hr />
      <li><a href="{%ROOT%}/amendment/11">Amendment 11</a></li>
      <li><a href="{%ROOT%}/amendment/12">Amendment 12</a></li>
      <li><a href="{%ROOT%}/amendment/13">Amendment 13</a></li>
      <li><a href="{%ROOT%}/amendment/14">Amendment 14</a></li>
      <li><a href="{%ROOT%}/amendment/15">Amendment 15</a></li>
      <li><a href="{%ROOT%}/amendment/16">Amendment 16</a></li>
      <li><a href="{%ROOT%}/amendment/17">Amendment 17</a></li>
      <li><a href="{%ROOT%}/amendment/18">Amendment 18</a></li>
      <li><a href="{%ROOT%}/amendment/19">Amendment 19</a></li>
      <li><a href="{%ROOT%}/amendment/20">Amendment 20</a></li>
      <li><a href="{%ROOT%}/amendment/21">Amendment 21</a></li>
      <li><a href="{%ROOT%}/amendment/22">Amendment 22</a></li>
      <li><a href="{%ROOT%}/amendment/23">Amendment 23</a></li>
      <li><a href="{%ROOT%}/amendment/24">Amendment 24</a></li>
      <li><a href="{%ROOT%}/amendment/25">Amendment 25</a></li>
      <li><a href="{%ROOT%}/amendment/26">Amendment 26</a></li>
      <li><a href="{%ROOT%}/amendment/27">Amendment 27</a></li>
      <hr />
      <li>
        <a href="{%ROOT%}/articles-of-confederation"
          >Articles of Confederation</a
        >
      </li>
      <li><a href="{%ROOT%}/articles-of-confederation">Preamble</a></li>
      <li><a href="{%ROOT%}/confederation/I">Article I</a></li>
      <li><a href="{%ROOT%}/confederation/II">Article II</a></li>
      <li><a href="{%ROOT%}/confederation/III">Article III</a></li>
      <li><a href="{%ROOT%}/confederation/IV">Article IV</a></li>
      <li><a href="{%ROOT%}/confederation/V">Article V</a></li>
      <li><a href="{%ROOT%}/confederation/VI">Article VI</a></li>
      <li><a href="{%ROOT%}/confederation/VII">Article VII</a></li>
      <li><a href="{%ROOT%}/confederation/VIII">Article VIII</a></li>
      <li><a href="{%ROOT%}/confederation/IX">Article IX</a></li>
      <li><a href="{%ROOT%}/confederation/X">Article X</a></li>
      <li><a href="{%ROOT%}/confederation/XI">Article XI</a></li>
      <li><a href="{%ROOT%}/confederation/XII">Article XII</a></li>
      <li><a href="{%ROOT%}/confederation/XIII">Article XIII</a></li>
      <hr />
      <!-- <li><a href="{%ROOT%}/about">About the Developer</a></li> -->
    </ul>
  </aside>
`;

const navLinks = [
  {
  }
];

const nav_html = html`
  <aside>
    <h2>Founding Documents</h2>
    <ul>
      <li><a href="{%ROOT%}/">Introduction</a></li>
      <li>
        <a href="{%ROOT%}/declaration-of-independence">
          Declaration of Independence
        </a>
      </li>
      <li class="sub-nav">
        Constitution
        <ul>
          <li><a href="{%ROOT%}/preamble">Preamble</a></li>
          <li>
            <a href="{%ROOT%}/article/I">Article I</a>
            <ul>
              <a href="{%ROOT%}/article/I/1">
                <li>Section 1</li>
              </a>
              <a href="{%ROOT%}/article/I/2">
                <li>Section 2</li>
              </a>
              <a href="{%ROOT%}/article/I/3">
                <li>Section 3</li>
              </a>
              <a href="{%ROOT%}/article/I/4">
                <li>Section 4</li>
              </a>
              <a href="{%ROOT%}/article/I/5">
                <li>Section 5</li>
              </a>
              <a href="{%ROOT%}/article/I/6">
                <li>Section 6</li>
              </a>
              <a href="{%ROOT%}/article/I/7">
                <li>Section 7</li>
              </a>
              <a href="{%ROOT%}/article/I/8">
                <li>Section 8</li>
              </a>
              <a href="{%ROOT%}/article/I/9">
                <li>Section 9</li>
              </a>
              <a href="{%ROOT%}/article/I/10">
                <li>Section 10</li>
              </a>
            </ul>
          </li>
          <li>
            <a href="{%ROOT%}/article/II">Article II</a>
            <ul>
              <a href="{%ROOT%}/article/II/1">
                <li>Section 1</li>
              </a>
              <a href="{%ROOT%}/article/II/2">
                <li>Section 2</li>
              </a>
              <a href="{%ROOT%}/article/II/3">
                <li>Section 3</li>
              </a>
              <a href="{%ROOT%}/article/II/4">
                <li>Section 4</li>
              </a>
            </ul>
          </li>
          <li>
            <a href="{%ROOT%}/article/III">Article III</a>
            <ul>
              <a href="{%ROOT%}/article/III/1">
                <li>Section 1</li>
              </a>
              <a href="{%ROOT%}/article/III/2">
                <li>Section 2</li>
              </a>
              <a href="{%ROOT%}/article/III/3">
                <li>Section 3</li>
              </a>
            </ul>
          </li>
          <li>
            <a href="{%ROOT%}/article/IV">Article IV</a>
            <ul>
              <a href="{%ROOT%}/article/IV/1">
                <li>Section 1</li>
              </a>
              <a href="{%ROOT%}/article/IV/2">
                <li>Section 2</li>
              </a>
              <a href="{%ROOT%}/article/IV/3">
                <li>Section 3</li>
              </a>
              <a href="{%ROOT%}/article/IV/4">
                <li>Section 4</li>
              </a>
            </ul>
          </li>
          <li><a href="{%ROOT%}/article/V">Article V</a></li>
          <li><a href="{%ROOT%}/article/VI">Article VI</a></li>
          <li><a href="{%ROOT%}/article/VII">Article VII</a></li>
        </ul>
      </li>
      <li>
        <a href="{%ROOT%}/bill-of-rights">Bill of Rights</a>
        <ul>
          <a href="{%ROOT%}/amendment/1">
            <li>Amendment 1</li>
          </a>
          <a href="{%ROOT%}/amendment/2">
            <li>Amendment 2</li>
          </a>
          <a href="{%ROOT%}/amendment/3">
            <li>Amendment 3</li>
          </a>
          <a href="{%ROOT%}/amendment/4">
            <li>Amendment 4</li>
          </a>
          <a href="{%ROOT%}/amendment/5">
            <li>Amendment 5</li>
          </a>
          <a href="{%ROOT%}/amendment/6">
            <li>Amendment 6</li>
          </a>
          <a href="{%ROOT%}/amendment/7">
            <li>Amendment 7</li>
          </a>
          <a href="{%ROOT%}/amendment/8">
            <li>Amendment 8</li>
          </a>
          <a href="{%ROOT%}/amendment/9">
            <li>Amendment 9</li>
          </a>
          <a href="{%ROOT%}/amendment/10">
            <li>Amendment 10</li>
          </a>
        </ul>
      </li>
      <hr />
      <li><a href="{%ROOT%}/amendment/11">Amendment 11</a></li>
      <li><a href="{%ROOT%}/amendment/12">Amendment 12</a></li>
      <li><a href="{%ROOT%}/amendment/13">Amendment 13</a></li>
      <li><a href="{%ROOT%}/amendment/14">Amendment 14</a></li>
      <li><a href="{%ROOT%}/amendment/15">Amendment 15</a></li>
      <li><a href="{%ROOT%}/amendment/16">Amendment 16</a></li>
      <li><a href="{%ROOT%}/amendment/17">Amendment 17</a></li>
      <li><a href="{%ROOT%}/amendment/18">Amendment 18</a></li>
      <li><a href="{%ROOT%}/amendment/19">Amendment 19</a></li>
      <li><a href="{%ROOT%}/amendment/20">Amendment 20</a></li>
      <li><a href="{%ROOT%}/amendment/21">Amendment 21</a></li>
      <li><a href="{%ROOT%}/amendment/22">Amendment 22</a></li>
      <li><a href="{%ROOT%}/amendment/23">Amendment 23</a></li>
      <li><a href="{%ROOT%}/amendment/24">Amendment 24</a></li>
      <li><a href="{%ROOT%}/amendment/25">Amendment 25</a></li>
      <li><a href="{%ROOT%}/amendment/26">Amendment 26</a></li>
      <li><a href="{%ROOT%}/amendment/27">Amendment 27</a></li>
      <hr />
      <li>
        <a href="{%ROOT%}/articles-of-confederation"
          >Articles of Confederation</a
        >
      </li>
      <li><a href="{%ROOT%}/articles-of-confederation">Preamble</a></li>
      <li><a href="{%ROOT%}/confederation/I">Article I</a></li>
      <li><a href="{%ROOT%}/confederation/II">Article II</a></li>
      <li><a href="{%ROOT%}/confederation/III">Article III</a></li>
      <li><a href="{%ROOT%}/confederation/IV">Article IV</a></li>
      <li><a href="{%ROOT%}/confederation/V">Article V</a></li>
      <li><a href="{%ROOT%}/confederation/VI">Article VI</a></li>
      <li><a href="{%ROOT%}/confederation/VII">Article VII</a></li>
      <li><a href="{%ROOT%}/confederation/VIII">Article VIII</a></li>
      <li><a href="{%ROOT%}/confederation/IX">Article IX</a></li>
      <li><a href="{%ROOT%}/confederation/X">Article X</a></li>
      <li><a href="{%ROOT%}/confederation/XI">Article XI</a></li>
      <li><a href="{%ROOT%}/confederation/XII">Article XII</a></li>
      <li><a href="{%ROOT%}/confederation/XIII">Article XIII</a></li>
      <hr />
      <!-- <li><a href="{%ROOT%}/about">About the Developer</a></li> -->
    </ul>
  </aside>
`;

class USNavElement extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = nav_html;
  }

  connectedCallback() {}
}

if (!customElements.get("us-nav")) {
  customElements.define("us-nav", USNavElement);
}
