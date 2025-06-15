document.addEventListener('DOMContentLoaded', () => {
  
  const authorLinks = {
    "Youyou Lu": "http://storage.cs.tsinghua.edu.cn/~lu/",
    "Zhe Yang": "http://storage.cs.tsinghua.edu.cn/~yz",
    "Qing Wang": "http://qingwang.io/",
    "Minhui Xie": "https://minhui-xie.github.io/",
    "Jiwu Shu": "http://storage.cs.tsinghua.edu.cn/~jiwu-shu",
    "Youmin Chen": "https://chenyoumin1993.github.io/",
    "Xiaojian Liao": "https://liaoxiaojian.github.io/",
    "Erci Xu": "https://giorgioercixu.github.io/",
    "Jing Wang": "https://storage.cs.tsinghua.edu.cn/~wj/",
    "Jiazhen Lin": "https://storage.cs.tsinghua.edu.cn/~ljz/",
    "王晶": "https://storage.cs.tsinghua.edu.cn/~wj/",
    "陈游旻": "https://chenyoumin1993.github.io/",
    "汪庆": "http://qingwang.io/",
    "廖晓坚": "https://liaoxiaojian.github.io/",
    "舒继武": "http://storage.cs.tsinghua.edu.cn/~jiwu-shu",
    "Qingda Hu": "https://scholar.google.com/citations?user=mdD3xMMAAAAJ"
  };
  
  fetch('papers/publications.json')
    .then(response => response.json())
    .then(papers => {
      const grouped = {};
      papers.forEach(paper => {
        if (!grouped[paper.year]) {
          grouped[paper.year] = [];
        }
        grouped[paper.year].push(paper);
      });

      const container = document.getElementById('paper-list');
      const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

      sortedYears.forEach(year => {
        // const yearHeader = document.createElement('h3');
        // yearHeader.textContent = year;
        // container.appendChild(yearHeader);

        const ul = document.createElement('ul');
        grouped[year].forEach(paper => {
          const item = document.createElement('li');
          item.style.marginBottom = "8px";

          const highlightedAuthors = paper.authors.map(name => {
            if (name.includes("Junru Li") || name.includes("李俊儒") || name.includes("Junru Li*")) {
              return `<span class="highlight">${name}</span>`;
            } else if (authorLinks[name]) {
              return `<a href="${authorLinks[name]}" class="author-link">${name}</a>`;
            } else {
              return name;
            }
          }).join(", ");


          const codeLink = paper.code ? ` <a href="${paper.code}" target="_blank" class="bule-tag">[Code]</a>` : "";

          const max_inline_award_length = 30
          const awardInline = paper.award && paper.award.length < max_inline_award_length
            ? ` (<span class="award-inline">${paper.award}</span>)`
            : "";

          const awardBlock = paper.award && paper.award.length >= max_inline_award_length
            ? `<br><span class="award">${paper.award}</span>`
            : "";

          item.innerHTML = `
            ${paper.short ? `<strong>[${paper.short}]</strong> ` : ""}
            <a href="${paper.link}" target="_blank">${paper.title}</a>${codeLink}<br>
            <span class="authors">${highlightedAuthors}</span><br>
            <span class="venue-full">${paper.venue}, ${paper.year}${awardInline}</span>
            ${awardBlock}
          `;

          ul.appendChild(item);
        });
        container.appendChild(ul);
      });
    })
    .catch(error => {
      console.error('Failed to load publications:', error);
      const container = document.getElementById('paper-list');
      container.innerHTML = '<p>Failed to load publication list.</p>';
    });
});
