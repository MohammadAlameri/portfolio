#include <iostream>
using namespace std;
template <typename t>

class Tree
{
    struct NODE
    {
        /* data */
        t data;
        NODE *left;
        NODE *right;

        Node(t d)
        {
            this->data = d;
            this->left = this->right = nullptr;
        }
    };

public:
    NODE *root = nullptr;
    Tree()
    {
        NODE *f = new NODE('F');
        NODE *b = new NODE('B');
        NODE *g = new NODE('G');
        NODE *a = new NODE('A');
        NODE *d = new NODE('D');
        NODE *i = new NODE('I');
        NODE *c = new NODE('C');
        NODE *e = new NODE('E');
        NODE *h = new NODE('H');
        f->left = b;
        f->right = g;
        b->left = a;
        b->right = d;
        g->right = i;
        d->left = c;
        d->right = e;
        i->left = h;

        root = f;
    }
    void preorder(NODE *pr)
    {
        if (pr != nullptr)
        {
            cout << " " << pr->data;
            preorder(pr->left);
            preorder(pr->right);
        }
    }

    void postorder(NODE *pr)
    {
        if (pr != nullptr)
        {
            postorder(pr->left);
            postorder(pr->right);
            cout << " " << pr->data;
        }
    }
    void inorder(NODE *pr)
    {
        if (pr != nullptr)
        {
            inorder(pr->left);
            cout << " " << pr->data;
            inorder(pr->right);
        }
    }
}

// main function

int
main()
{
    Tree<char> obj;
    if (obj.root == nullptr)
    {
        cout << "Tree is empty";
    }
    else
    {
        cout << "\nPreorder Travelsal\t:\t";
        obj.preorder(obj.root);
        cout << "\nInorder Travelsal\t:\t";
        obj.inorder(obj.root);
        cout << "\nPostorder Travelsal\t:\t";
        obj.postorder(obj.root);
    }

    return 0;
}
