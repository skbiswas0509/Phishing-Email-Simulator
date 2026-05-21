const BASE = "http://localhost:4000/api"

export async function getCampaigns() {
    const res = await fetch(`${BASE}/campaigns`);
    return res.json();
}

export async function createCampaign(data) {
    const res = await fetch(`${BASE}/campaigns`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function sendCampaing(campaignId, recepients) {
    const res = await fetch(`${BASE}/send/${campaignId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({recipients})
    })
    return res.json();
}

export async function getCampaign(id) {
    const res = await fetch(`${BASE}/campaigns/${id}`);
    return res.json();
}

export async function deleteCampaign(id) {
    const res = await fetch(`${BASE}/campaigns/${id}`, { method: 'DELETE'});
    return res.json();
}