fetch('https://api.worldoftanks.asia/wot/clans/info/?application_id=b4201b463f60efce04a102e3dc549e2d&clan_id=2000006094')
  .then(response => response.json())
  .then(data => {
    const clan = data.data[2000006094];



    accountIds = []

    clan.members.forEach(member => {

      hoge = member.account_id;
      accountIds.push(hoge);

  
});



function getAccountData(accountIds) {
  const accountDataPromises = [];
  for (const accountId of accountIds) {
    const url = `https://api.worldoftanks.asia/wot/account/info/?application_id=b4201b463f60efce04a102e3dc549e2d&account_id=${accountId}`;
    const promise = fetch(url)
      .then(response => response.json())
      .then(data => {
        const accountName = data.data[accountId].nickname;
        const lastBattleTime = data.data[accountId].last_battle_time;
        const now = new Date().getTime();
        const diffMilliseconds = now - lastBattleTime * 1000;
        const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24) );

        return { accountName, diffDays};
      });
    accountDataPromises.push(promise);
  }
  return Promise.all(accountDataPromises);
}

getAccountData(accountIds)
  .then(accountData => {
    accountData.sort((a,b) => b.diffDays - a.diffDays)

    accountData.forEach(member => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      const tdID = document.createElement('td');
      tdName.textContent = member.accountName;
      tdID.textContent = member.diffDays;
      tr.appendChild(tdName);
      tr.appendChild(tdID);
      tbody.appendChild(tr);
    });

    document.body.appendChild(table);
  });












    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const trHead = document.createElement('tr');
    const thName = document.createElement('th');
    const thID = document.createElement('th');
    thName.textContent = 'Player name';
    thID.textContent = 'days ago';
    trHead.appendChild(thName);
    trHead.appendChild(thID);
    thead.appendChild(trHead);
    table.appendChild(thead);
    table.appendChild(tbody);

  




  })
  .catch(error => console.error(error));